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
  EditProfileModalType,
  FormEditProfileType,
  FormProjectType,
  TechnologieType,
} from '../../../types';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import BackError from '../../all/errors/Back-error';
import HookFormError from '../../all/errors/Hook-form-error';
import LoaderWrapper from '../../all/loader/Loader-wrapper';
import defautlImageUser from '../../../assets/images/default-user-image.png';
import arrayComparison from '../../../utils/array-comparison';
import profileEditSchema from '../../../security/form-validation/profile-edit-schema';

function EditProfileModal({ setModal, setResults }: EditProfileModalType) {
  const { setGlobalErrorMessage, setLoading } = useSettingsStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<FormEditProfileType>({
    resolver: zodResolver(profileEditSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState('');
  const [suggestTechno, setSuggestTechno] = useState<TechnologieType[]>([]);
  const [technoSelected, setTechnoSelected] = useState<TechnologieType[]>([]);
  const [inputTechnoValue, setInputTechnoValue] = useState<string>('');
  const [technologies, setTechnologies] = useState<TechnologieType[]>([]);

  // State to know if user has edit / delete image in order to send it if he did and only if he did that
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  // We use React Hook Form with title, rhythm, description and image, so we need initial technologie state to compare in roder to send to the back oly input edited
  const [initialTechnologie, setInitialTechnologie] = useState<
    TechnologieType[]
  >([]);
  const [initialProfileData, setInitialProfileData] =
    useState<FormProjectType | null>(null);

  useEffect(() => {
    async function getTechnologies() {
      try {
        const { data } = await axiosWithCSRFtoken.get('/technologies');
        const { data: profileData } =
          await axiosWithCSRFtoken.get('/personal-profile');
        const allTechnologies = data.result;
        const profile = profileData.result;
        Object.keys(profile).forEach((key) => {
          if (key === 'image') {
            setImagePreview(profile[key]);
          } else if (key === 'techno') {
            setInitialTechnologie(profile[key]);
            setTechnoSelected(profile[key]);
          } else {
            setValue(key as keyof FormEditProfileType, profile[key]);
          }
        });
        setInitialProfileData(profile);
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
  }, [setGlobalErrorMessage, setValue]);

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
    setImageChanged(true);
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImageChanged(true);
    setImagePreview('');
    resetField('image');
  };

  async function onSubmit(data: FormEditProfileType) {
    if (!initialProfileData) {
      return setErrorMessage('Erreur inattendue');
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== 'image' &&
        value !== initialProfileData[key as keyof FormProjectType]
      ) {
        formData.append(key, value);
      }

      // Here if user change or delete image, imageChanged is true, the value of image is reset and we send it to the form in order to inform back that user change or delete image
      if (imageChanged && key === 'image') {
        formData.append(key, value);
      }
    });

    if (!arrayComparison(technoSelected, initialTechnologie)) {
      formData.append('techno', JSON.stringify(technoSelected));
    }

    try {
      setLoading(true);
      const { data: dataProfileEdited } = await axiosWithCSRFtoken.patch(
        '/edit-profile',
        formData
      );
      const profileEdited = dataProfileEdited.result;
      setResults(profileEdited);
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
        className="p-4 z-50 overflow-y-scroll bg-white rounded-lg w-4/5 max-w-3xl  flex justify-center items-center flex-col h-4/5 max-h-35 dark:text-black shadow-2xl "
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
                <div className=" relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
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
                        className="absolute top-4 right-7 "
                      >
                        <MdDelete className="w-6 bg-white2 p-1 rounded-2xl h-6 hover:scale-125 transition" />
                      </button>
                    </>
                  ) : (
                    <img
                      src={defautlImageUser}
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
                  <label htmlFor="title">Pseudo</label>
                  <input
                    {...register('pseudo')}
                    type="text"
                    id="title"
                    className="rounded-lg p-2 outline-none"
                    placeholder="Entrez un titre"
                  />
                  <HookFormError
                    error={errors.pseudo}
                    message={errors.pseudo?.message}
                  />
                </div>
                <div>
                  <label htmlFor="type">Choisissez un type</label>
                  <select
                    id="type"
                    {...register('type')}
                    className=" h-9 w-full mt-1  px-1 outline-none bg-transparent rounded-lg  bg-white2  "
                  >
                    <option value="Développeur">Développeur</option>
                    <option value="Développeur junior">
                      Développeur junior
                    </option>
                    <option value="Développeur Front-end">
                      Développeur Front-end
                    </option>
                    <option value="Développeur Back-end">
                      Développeur Back-end
                    </option>
                    <option value="Développeur Full-stack">
                      Développeur Full-stack
                    </option>
                    <option value="Intégrateur web">Intégrateur web</option>
                    <option value="Graphiste">Graphiste</option>
                    <option value="Administrateur système">
                      Administrateur système
                    </option>
                  </select>
                  <HookFormError
                    error={errors.type}
                    message={errors.type?.message}
                  />
                </div>
              </div>
            </div>
            <div className="relative flex-grow rounded-3xl my-8">
              <p className="mb-2">
                Selectionnez les technologies que vous maitrisez :
              </p>
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
                    <div className="absolute top-full left-0 z-30  p-2  w-full mt-1 dark:bg-white2 bg-slate-300  rounded-md shadow-md max-h-56  overflow-scroll ">
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
                            className="h-9 p-1 bg-white2 rounded-xl"
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
                Enregistrer
              </button>
            </div>
          </LoaderWrapper>
        </form>
      </div>
    </div>
  );
}
export default EditProfileModal;
