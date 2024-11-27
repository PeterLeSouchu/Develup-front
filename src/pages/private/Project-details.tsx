import axios from 'axios';
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { useState } from 'react';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import { ProjectType } from '../../types';
import formatDate from '../../utils/date-timestamp';
import defaultImageProject from '../../assets/images/default-project-image.jpg';
import SendMessageModal from '../../components/private/modals/Send-message-modal';
import Loader from '../../components/all/loader/Loader';

// eslint-disable-next-line react-refresh/only-export-components
export const loadProjectDetails = async ({ params }: LoaderFunctionArgs) => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithoutCSRFtoken.get(`/project/${params.slug}`);
    const project = data.result;

    return project;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      setGlobalErrorMessage(message);
      return 'erreur inattendu';
    }
    setGlobalErrorMessage('Erreur innatendu, essayez de vous reconnecter');
    return 'erreur inattendu';
  }
};

function ProjectDetails() {
  const project = useLoaderData() as ProjectType;
  const { state } = useNavigation();
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const { setGlobalErrorMessage } = useSettingsStore();
  const navigate = useNavigate();

  function handleDisplayModal() {
    console.log(project.isAlreadyConversation);
    try {
      if (project.isAlreadyConversation) {
        return navigate(
          `/dashboard/conversation/${project.isAlreadyConversation}`
        );
      }
      return setMessageModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message === 'Votre session a expiré, veuillez vous reconnecter') {
          return setGlobalErrorMessage(message);
        }
        return setGlobalErrorMessage(message);
      }
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }

  if (state === 'loading') {
    return <Loader />;
  }

  return (
    <div className="sm:px-10 px-3">
      <div className="flex md:flex-row flex-col justify-around md:h-64 mb-14 mdmb-14">
        <img
          className=" md:mx-0  dark:bg-slate-200  rounded-lg   mx-auto md:max-w-96 md:mb-0 mb-10 object-cover"
          src={project.image || defaultImageProject}
          alt={project.title}
        />
        <div className="flex flex-col md:w-1/2 md:items-center justify-center gap-3 md:gap-7   dark:text-white2  rounded-lg md:max-w-xl">
          <h1 className=" md:text-center w-full md:text-4xl text-4xl font-bol break-words">
            {project.title}
          </h1>
          <p className="  rounded-xl  max-w-64 italic ">
            Rythme : {project.rhythm}
          </p>
          <div className="flex items-center md:justify-center">
            <h2 className=" underline underline-offset-4 mr-4 transition hover:text-darkgold2 dark:hover:text-gold ">
              <Link to={`/dashboard/user/${project.user_slug}`}>
                Par {project.ownProject ? 'vous' : project.pseudo}
              </Link>
            </h2>
            {project.ownProject ? (
              ''
            ) : (
              <button
                type="button"
                className="rounded-lg p-2 bg-gold dark:bg-darkgold transition hover:bg-darkgold dark:hover:bg-gold dark:hover:text-black "
                onClick={handleDisplayModal}
              >
                Contacter l&apos;auteur
              </button>
            )}
          </div>
        </div>
      </div>

      {project.techno.length > 0 ? (
        project.techno.map((techno) => (
          <span
            key={techno.id}
            className="inline-flex items-center gap-1 px-3 py-2 dark:text-black mb-3 rounded-3xl transition bg-white2 dark:bg-slate-300 hover:op mr-3"
          >
            {' '}
            <img
              src={techno.image}
              alt="nextjs"
              className="w-9 h-9 p-1 bg-white2 rounded-lg "
            />{' '}
            <p>{techno.name}</p>
          </span>
        ))
      ) : (
        <p className="text-sm">Aucune technologie</p>
      )}

      <p className="mt-10 break-words whitespace-pre-wrap">
        {project.description}
      </p>
      <p className=" text-sm italic text-slate-500 dark:text-white2 pt-10 underline underline-offset-8 ">
        Le {formatDate(project.created_at)}
      </p>
      {messageModal && (
        <SendMessageModal
          setModal={setMessageModal}
          projectId={project.id}
          userId={project.user_id}
        />
      )}
    </div>
  );
}
export default ProjectDetails;
