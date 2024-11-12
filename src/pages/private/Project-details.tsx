import axios from 'axios';
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import { ProjectType } from '../../types';

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
  return (
    <div className="px-10">
      <div className="flex md:flex-row flex-col justify-around md:h-64 mb-14 mdmb-14">
        <img
          className=" md:mx-0  dark:bg-white p-1 rounded-2xl   mx-auto max-w-72 md:mb-0 mb-10"
          src={project.image}
          alt={project.title}
        />
        <div className="flex flex-col md:w-1/2 md:items-center justify-center gap-3 md:gap-7   dark:text-white2  rounded-lg md:max-w-xl">
          <h1 className=" md:text-center w-full md:text-5xl text-4xl font-bol break-words">
            {project.title}
          </h1>
          <p className="  rounded-xl  max-w-64 italic ">
            Rythme : {project.rhythm}
          </p>
          <div className="flex items-center md:justify-center">
            <h2 className=" underline underline-offset-4 mr-4 transition hover:text-darkgold2 dark:hover:text-gold ">
              <Link to={`/dashboard/user/${project.user_slug}`}>
                Par {project.pseudo}
              </Link>
            </h2>
            <button
              type="button"
              className="rounded-lg p-2 bg-gold dark:bg-darkgold transition hover:bg-darkgold dark:hover:bg-gold dark:hover:text-black "
            >
              Contacter l&apos;auteur
            </button>
          </div>
        </div>
      </div>
      <h2 className="my-5">
        {' '}
        {project.techno.length === 1 ? 'Technologie :' : 'Technologies :'}{' '}
      </h2>
      {project.techno.map((techno) => (
        <span
          key={techno.id}
          className="inline-flex items-center gap-1 px-3 py-2 dark:text-black mb-3 rounded-3xl transition bg-slate-300 hover:op mr-3"
        >
          {' '}
          <img
            src={techno.image}
            alt="nextjs"
            className="w-9 h-9 p-1 bg-white2 rounded-lg "
          />{' '}
          <p>{techno.name}</p>
        </span>
      ))}

      <p className="mt-10 break-words">{project.description}</p>
    </div>
  );
}
export default ProjectDetails;
