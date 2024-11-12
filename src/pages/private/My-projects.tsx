import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';
import { useSettingsStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { ProjectType } from '../../types';
import TechnoLogoDisplay from '../../components/private/Techno-logo-display';

export const loadPersonalProjects = async () => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithoutCSRFtoken.get(`/personal-projects`);
    const projects = data.result;
    return projects;
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

function MyProjects() {
  const projects = useLoaderData() as ProjectType[];

  return (
    <div className="flex items-center justify-center  flex-col gap-10 mx-auto dark:text-black">
      <h1 className="text-3xl text-center dark:text-white">Vos projets</h1>
      <section className="flex justify-start sm:flex-row flex-col gap-6 h-full overflow-x-auto w-full items-center py-7 px-2">
        {projects?.length > 0 &&
          projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white2 dark:bg-slate-200 shadow-lg h-99 w-72 rounded-lg dark:border-white2 border-2 p-3 flex-shrink-0 flex flex-col relative"
            >
              <button
                type="button"
                className="absolute left-3 top-3 hover:scale-150 transition"
              >
                <FaEdit className="text-xl" />
              </button>
              <button
                type="button"
                className="absolute left-12 top-3 hover:scale-150 transition"
              >
                <MdDelete className="text-xl" />
              </button>
              <span className="text-sm absolute right-2 top-2 p-1 bg-gold rounded-xl dark:text-white dark:bg-darkgold">
                {project.rhythm}
              </span>
              <Link to={`/dashboard/project/${project.slug}`}>
                <img
                  className="h-40 mx-auto"
                  src={project.image}
                  alt={project.title}
                />
                <h3 className="text-2xl my-3 line-clamp-2 break-words">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm line-clamp-6 my-3 break-words">
                {project.description}
              </p>
              {TechnoLogoDisplay(project.techno)}
            </div>
          ))}
        <button
          type="button"
          className="text-6xl text-white dark:text-darkTheme text-center rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center bg-darkgold2 dark:bg-gold hover:scale-105 transition "
        >
          +
        </button>
      </section>
    </div>
  );
}
export default MyProjects;
