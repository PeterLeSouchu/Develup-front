import axios from 'axios';
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { useState } from 'react';
import { LuCalendar, LuMessagesSquare } from 'react-icons/lu';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import { ProjectType } from '../../types';
import formatDate from '../../utils/date-timestamp';
import defaultImageProject from '../../assets/images/default-project-image.jpg';
import SendMessageModal from '../../components/private/modals/Send-message-modal';

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

  return (
    <div>
      <article className="dv-surface overflow-hidden">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <img
            className="aspect-[16/10] h-full w-full object-cover"
            src={project.image || defaultImageProject}
            alt={project.title}
          />
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
            <span className="dv-rhythm self-start">{project.rhythm}</span>
            <h1 className="break-words font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
              {project.title}
            </h1>
            <Link
              to={`/dashboard/user/${project.user_slug}`}
              className="dv-muted self-start text-sm underline-offset-4 transition hover:text-ink hover:underline dark:hover:text-paper"
            >
              Par{' '}
              <span className="font-semibold text-ink dark:text-paper">
                {project.ownProject ? 'vous' : project.pseudo}
              </span>
            </Link>
            {project.ownProject ? (
              ''
            ) : (
              <button
                type="button"
                className="dv-btn-primary self-start"
                onClick={handleDisplayModal}
              >
                <LuMessagesSquare aria-hidden />
                Contacter l&apos;auteur
              </button>
            )}
            <p className="dv-muted flex items-center gap-1.5 text-xs">
              <LuCalendar aria-hidden />
              Publié le {formatDate(project.created_at)}
            </p>
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="dv-surface p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Le projet</h2>
          <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed">
            {project.description}
          </p>
        </section>
        <section className="dv-surface self-start p-6">
          <h2 className="font-display text-lg font-bold">Technologies</h2>
          {project.techno.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techno.map((techno) => (
                <li key={techno.id} className="dv-chip">
                  <img src={techno.image} alt="" className="dv-chip-logo" />
                  {techno.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dv-muted mt-3 text-sm">Aucune technologie</p>
          )}
        </section>
      </div>
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
