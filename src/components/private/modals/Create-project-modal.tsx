/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSettingsStore } from '../../../store';
import {
  CreateModalType,
  FormProjectType,
  TechnologieType,
} from '../../../types';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import projectSchema from '../../../security/form-validation/project-schema';
import BackError from '../../all/errors/Back-error';
import HookFormError from '../../all/errors/Hook-form-error';
import LoaderWrapper from '../../all/loader/Loader-wrapper';
import defautlImageProject from '../../../assets/images/default-project-image.jpg';

function CreateProjectModal({ setModal, setResults }: CreateModalType) {
  const { setGlobalErrorMessage, setLoading } = useSettingsStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<FormProjectType>({ resolver: zodResolver(projectSchema) });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState('');
  const [suggestTechno, setSuggestTechno] = useState<TechnologieType[]>([]);
  const [technoSelected, setTechnoSelected] = useState<TechnologieType[]>([]);
  const [inputTechnoValue, setInputTechnoValue] = useState<string>('');
  const [technologies, setTechnologies] = useState<TechnologieType[]>([]);

  useEffect(() => {
    async function getTechnologies() {
      try {
        const { data } = await axiosWithCSRFtoken.get('/technologies');

        const allTechnologies = data.result;
        return setTechnologies(allTechnologies);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message;
          setGlobalErrorMessage(message);
          return 'erreur inattendu';
        }
        setGlobalErrorMessage('Erreur innatendu, essayez de vous reconnecter');
        return 'erreur inattendu';
      }
    }
    document.body.style.overflow = 'hidden';
    getTechnologies();
    return () => {
      document.body.style.overflow = '';
    };
  }, [setGlobalErrorMessage]);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setInputTechnoValue(e.target.value);

    const filteredTechno = technologies.filter((tech) =>
      tech.name.toLowerCase().includes(value)
    );

    if (value === '') {
      setSuggestTechno([]);
    } else {
      setSuggestTechno(filteredTechno);
    }
  }

  function handleAddTechno(tech: TechnologieType) {
    setTechnoSelected((prevArray) => {
      if (prevArray.some((technologie) => technologie.id === tech.id)) {
        return prevArray;
      }
      return [...prevArray, tech];
    });
    setSuggestTechno([]);
    setInputTechnoValue('');
  }

  function handleDeleteTechno(tech: TechnologieType) {
    setTechnoSelected((array) =>
      array.filter((technologie) => technologie.id !== tech.id)
    );
  }

  // Here we use URL object to genere url for image preview
  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImagePreview('');
    resetField('image');
  };

  async function onSubmit(data: FormProjectType) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Here we have to stringify technoSelected because formData can't have array type
    formData.append('techno', JSON.stringify(technoSelected));

    try {
      setLoading(true);
      const { data: dataProjectCreated } = await axiosWithCSRFtoken.post(
        `${import.meta.env.VITE_API_URL}/api/project`,
        formData
      );
      const project = dataProjectCreated.result;
      setResults((prev) => [project, ...prev]);
      setLoading(false);
      return setModal(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message === 'Votre session a expiré, veuillez vous reconnecter') {
          return setGlobalErrorMessage(message);
        }
        return setErrorMessage(message);
      }
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }

  return (
    <div
      aria-label="close modal"
      onKeyDown={() => setModal(false)}
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center cursor-default"
      onClick={() => setModal(false)}
    >
      <div
        className="p-4 z-50 overflow-y-scroll bg-white rounded-lg w-4/5 max-w-3xl  flex justify-center items-center flex-col h-4/5 max-h-35 shadow-2xl "
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <BackError message={errorMessage} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full overflow-auto"
        >
          <LoaderWrapper>
            <div className="flex md:items-center justify-around md:flex-row flex-col w-full">
              <div className="flex flex-col items-center mb-7 md:pb-0 ">
                <div className=" relative w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Prévisualisation"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="absolute top-1 right-1 "
                      >
                        <MdDelete className="w-6 bg-white2 p-1 rounded-2xl h-6 hover:scale-125 transition" />
                      </button>
                    </>
                  ) : (
                    <img
                      src={defautlImageProject}
                      alt="Prévisualisation"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <label
                  htmlFor="image"
                  className="mt-4 px-4 py-2 bg-gold hover:bg-darkgold transition rounded-xl cursor-pointer"
                >
                  Choisir une image
                </label>
                <HookFormError
                  error={errors.image}
                  message={errors.image?.message}
                />
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  {...register('image')}
                  onChange={(e) => handleChangeImage(e)}
                />
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex  flex-col  gap-2">
                  <label htmlFor="title">Titre</label>
                  <input
                    {...register('title')}
                    type="text"
                    id="title"
                    className="rounded-lg p-2 outline-none"
                    placeholder="Entrez un titre"
                  />
                  <HookFormError
                    error={errors.title}
                    message={errors.title?.message}
                  />
                </div>
                <div className=" mt-4  bg-white2 border-2 rounded-lg ">
                  <select
                    {...register('rhythm')}
                    className="h-full w-full mb-2 px-1 outline-none bg-transparent rounded-r-3xl"
                  >
                    <option value="">Choisir un rythme</option>
                    <option value="1 à 2h/semaine">1 à 2h/semaine</option>
                    <option value="2 à 3h/semaine">2 à 3h/semaine</option>
                    <option value="3 à 5h/semaine">3 à 5h/semaine</option>
                    <option value="5 à 8h/semaine">5 à 8h/semaine</option>
                    <option value="8 à 12h/semaine">8 à 12h/semaine</option>
                    <option value="12 à 15h/semaine">12 à 15h/semaine</option>
                    <option value="15 à 20h/semaine">15 à 20h/semaine</option>
                    <option value="20 à 25h/semaine">20 à 25h/semaine</option>
                    <option value="25 à 30h/semaine">25 à 30h/semaine</option>
                    <option value="30 à 35h/semaine">30 à 35h/semaine</option>
                    <option value="+ 35h/semaine">+ 35h/semaine</option>
                  </select>
                  <HookFormError
                    error={errors.rhythm}
                    message={errors.rhythm?.message}
                  />
                </div>
              </div>
            </div>
            <div className="relative flex-grow rounded-3xl my-8">
              <p className="mb-2">Ajouter des technologies à votre projet :</p>
              <div className="relative">
                <input
                  onChange={(e) => handleChangeInput(e)}
                  value={inputTechnoValue}
                  type="text"
                  placeholder="Rechercher une techno"
                  className="w-full p-2   outline-none  pl-2 rounded-lg"
                />
                {suggestTechno.length > 0 && (
                  <>
                    <div
                      aria-label="close suggest techno"
                      onKeyDown={() => setSuggestTechno([])}
                      role="button"
                      tabIndex={0}
                      className="fixed inset-0 z-20   cursor-default"
                      onClick={() => setSuggestTechno([])}
                    />
                    <div className="absolute top-full left-0 z-30  p-2  w-full mt-1 dark:bg-white2 bg-slate-300  rounded-md shadow-md max-h-72  overflow-scroll ">
                      {suggestTechno.map((suggestion: TechnologieType) => (
                        <button
                          onClick={() => handleAddTechno(suggestion)}
                          type="button"
                          className="dark:hover:bg-slate-200 hover:bg-white2 transition w-full flex items-center justify-start gap-2 p-1"
                          key={suggestion.id}
                        >
                          <img
                            src={suggestion.image}
                            alt={suggestion.name}
                            className="w-12 h-12  p-1 bg-white2 rounded-xl"
                          />
                          {suggestion.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {technoSelected.length > 0 && (
                <div className="mt-4 p-2 rounded-3xl border-2 bg-white2 flex flex-wrap gap-2 ">
                  {technoSelected.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center gap-1 p-2 rounded-3xl transition bg-slate-200"
                    >
                      {' '}
                      <img
                        src={tech.image}
                        alt={tech.name}
                        className="w-7 h-7 p-1  bg-white2 rounded-lg "
                      />{' '}
                      <p className="">{tech.name}</p>
                      <button
                        onClick={() => handleDeleteTechno(tech)}
                        type="button"
                        className="hover:bg-slate-300 rounded-3xl p-1"
                      >
                        <RxCross2 />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                {...register('description')}
                name="description"
                id="description"
                className="rounded-lg resize-none outline-none p-3"
                placeholder="Ajouter une description ..."
              />
              <HookFormError
                error={errors.description}
                message={errors.description?.message}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="p-2 mt-5 bg-red-400  rounded-lg hover:bg-red-500 transition"
                onClick={() => setModal(false)}
              >
                annuler
              </button>
              <button
                type="submit"
                className="p-2 mt-5 bg-green-400  rounded-lg hover:bg-green-500 transition"
              >
                Ajouter
              </button>
            </div>
          </LoaderWrapper>
        </form>
      </div>
    </div>
  );
}
export default CreateProjectModal;
