import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LuImagePlus, LuTrash2 } from 'react-icons/lu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSettingsStore } from '../../../store';
import {
  EditModalType,
  FormProjectType,
  TechnologieType,
} from '../../../types';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import projectSchema from '../../../security/form-validation/project-schema';
import BackError from '../../all/errors/Back-error';
import HookFormError from '../../all/errors/Hook-form-error';
import LoaderWrapper from '../../all/loader/Loader-wrapper';
import ModalShell from '../ui/Modal-shell';
import TechnoPicker from '../ui/Techno-picker';
import RhythmOptions from '../ui/Rhythm-options';
import defautlImageProject from '../../../assets/images/default-project-image.jpg';
import arrayComparison from '../../../utils/array-comparison';

function EditProjectModal({
  setModal,
  setResults,
  projectSlug,
  setProjectSlug,
}: EditModalType) {
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

  // State to know if user has edit / delete image in order to send it if he did and only if he did that
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  // We use React Hook Form with title, rhythm, description and image, so we need initial technologie state to compare in roder to send to the back oly input edited
  const [initialTechnologie, setInitialTechnologie] = useState<
    TechnologieType[]
  >([]);
  const [initialProjectData, setInitialProjectData] =
    useState<FormProjectType | null>(null);

  useEffect(() => {
    async function getTechnologies() {
      try {
        setLoading(true);
        const { data } = await axiosWithCSRFtoken.get('/technologies');
        const { data: projectData } = await axiosWithCSRFtoken.get(
          `/project/${projectSlug}`
        );
        const allTechnologies = data.result;
        const detailsProject = projectData.result;
        Object.keys(detailsProject).forEach((key) => {
          if (key === 'image') {
            setImagePreview(detailsProject[key]);
          } else if (key === 'techno') {
            setInitialTechnologie(detailsProject[key]);
            setTechnoSelected(detailsProject[key]);
          } else {
            setValue(key as keyof FormProjectType, detailsProject[key]);
          }
        });
        setInitialProjectData(detailsProject);
        setLoading(false);
        return setTechnologies(allTechnologies);
      } catch (error) {
        setLoading(false);
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
  }, [projectSlug, setGlobalErrorMessage, setLoading, setValue]);

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

  async function onSubmit(data: FormProjectType) {
    if (!initialProjectData) {
      return setErrorMessage('Erreur inattendue');
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== 'image' &&
        value !== initialProjectData[key as keyof FormProjectType]
      ) {
        formData.append(key, value);
      }

      // Here if user chenge or delete image, imageChanged is true, the value of image is reset and we send it to the form in order to inform back that user change or delete image
      if (imageChanged && key === 'image') {
        formData.append(key, value);
      }
    });

    if (!arrayComparison(technoSelected, initialTechnologie)) {
      formData.append('techno', JSON.stringify(technoSelected));
    }

    try {
      setLoading(true);
      const { data: dataProjectEdited } = await axiosWithCSRFtoken.patch(
        `/project/${projectSlug}`,
        formData
      );
      const projectEdited = dataProjectEdited.result;
      setResults((prev) =>
        prev.map((project) =>
          project.id === projectEdited.id ? projectEdited : project
        )
      );
      setProjectSlug('');
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
    <ModalShell
      title="Modifier le projet"
      onClose={() => setModal(false)}
      size="lg"
    >
      <BackError message={errorMessage} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoaderWrapper>
          <div className="grid gap-6 md:grid-cols-[11rem_1fr] md:items-start">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-40 w-40 overflow-hidden border border-line bg-paper dark:border-night-line dark:bg-night $rounded-2xl">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Prévisualisation"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      aria-label="Supprimer l'image"
                      className="absolute right-2 top-2 grid h-[2rem] w-8 place-items-center rounded-full bg-white2 text-ink shadow transition hover:bg-[#FDF1EE] hover:text-[#B23A26]"
                    >
                      <LuTrash2 />
                    </button>
                  </>
                ) : (
                  <img
                    src={defautlImageProject}
                    alt="Prévisualisation"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="image"
                className="dv-btn-outline h-[2.5rem] w-full cursor-pointer whitespace-nowrap px-3 text-sm"
              >
                <LuImagePlus aria-hidden />
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
            <div className="flex flex-col gap-5">
              <div>
                <label className="dv-label" htmlFor="title">
                  Titre
                </label>
                <input
                  {...register('title')}
                  type="text"
                  id="title"
                  className="dv-input"
                  placeholder="Le nom de votre projet"
                />
                <HookFormError
                  error={errors.title}
                  message={errors.title?.message}
                />
              </div>
              <div>
                <label className="dv-label" htmlFor="rhythm">
                  Rythme
                </label>
                <select
                  {...register('rhythm')}
                  id="rhythm"
                  className="dv-input cursor-pointer"
                >
                  <RhythmOptions />
                </select>
                <HookFormError
                  error={errors.rhythm}
                  message={errors.rhythm?.message}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="dv-label" htmlFor="modal-techno">
              Technologies du projet
            </label>
            <TechnoPicker
              inputId="modal-techno"
              inputValue={inputTechnoValue}
              onInputChange={(e) => handleChangeInput(e)}
              suggestions={suggestTechno}
              onCloseSuggestions={() => setSuggestTechno([])}
              onAdd={(tech) => handleAddTechno(tech)}
              selected={technoSelected}
              onDelete={(tech) => handleDeleteTechno(tech)}
            />
          </div>
          <div className="mt-6">
            <label className="dv-label" htmlFor="description">
              Description
            </label>
            <textarea
              {...register('description')}
              name="description"
              id="description"
              rows={6}
              className="dv-input h-auto resize-y py-3 leading-relaxed"
              placeholder="Présentez votre projet et le profil des personnes que vous cherchez"
            />
            <HookFormError
              error={errors.description}
              message={errors.description?.message}
            />
          </div>
          <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="dv-btn-ghost"
              onClick={() => setModal(false)}
            >
              Annuler
            </button>
            <button type="submit" className="dv-btn-primary">
              Enregistrer
            </button>
          </div>
        </LoaderWrapper>
      </form>
    </ModalShell>
  );
}
export default EditProjectModal;
