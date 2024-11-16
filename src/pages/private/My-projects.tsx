import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';
import { useSettingsStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { ProjectType } from '../../types';
import DeleteProjectModal from '../../components/private/modals/Delete-project-modal';
import CreateProjectModal from '../../components/private/modals/Create-project-modal';
import ProjectCard from '../../components/private/Project-card';
import formatDate from '../../utils/date-timestamp';

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

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>('');

  // we use this state for better ui, when user delete/add/update a project we reflecte the db
  const [results, setResults] = useState<ProjectType[]>([]);

  useEffect(() => {
    setResults(projects);
  }, [projects]);

  function handleDeleteModal(id: string) {
    setProjectId(id);
    setDeleteModal(true);
  }

  function handleCreateModal() {
    setCreateModal(true);
  }

  return (
    <div className="flex items-center justify-center h-full mx-auto dark:text-black">
      <section className="flex sm:flex-row flex-col gap-20 md:gap-10 h-full sm:overflow-x-auto w-full items-center md:pl-10  px-2">
        {results?.length > 0 ? (
          results?.map((result) => (
            <div key={result.id}>
              <div className="mb-4">
                <div className="flex justify-around items-center w-28 mx-auto mb-4">
                  <button
                    type="button"
                    className="  p-2 rounded-full bg-gold dark:bg-darkgold dark:hover:bg-gold hover:scale-125 hover:bg-darkgold transition "
                  >
                    <FaEdit className="text-2xl  " />
                  </button>
                  <button
                    type="button"
                    className="  p-2 rounded-full bg-gold dark:bg-darkgold dark:hover:bg-gold hover:scale-125 hover:bg-darkgold transition "
                    onClick={() => handleDeleteModal(result.id)}
                  >
                    <MdDelete className="text-2xl  " />
                  </button>
                </div>
                <p className=" text-xs italic  underline underline-offset-4 text-center dark:text-white2 ">
                  Le {formatDate(result.created_at)}
                </p>
              </div>
              <ProjectCard project={result} />
            </div>
          ))
        ) : (
          <p className="dark:text-white2">
            Vous n&apos;avez pas encore créé de projet
          </p>
        )}
        <button
          type="button"
          className="text-6xl  dark:text-darkTheme text-center rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gold dark:bg-darkgold hover:scale-110 hover:bg-darkgold dark:hover:bg-gold transition text-black "
          onClick={handleCreateModal}
        >
          +
        </button>
      </section>
      {deleteModal && (
        <DeleteProjectModal
          setModal={setDeleteModal}
          projectId={projectId}
          setProjectId={setProjectId}
          setResults={setResults}
        />
      )}
      {createModal && (
        <CreateProjectModal setModal={setCreateModal} setResults={setResults} />
      )}
    </div>
  );
}
export default MyProjects;
