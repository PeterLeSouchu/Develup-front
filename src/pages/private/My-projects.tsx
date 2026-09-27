import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  LuCalendar,
  LuFolderKanban,
  LuPencil,
  LuPlus,
  LuTrash2,
} from 'react-icons/lu';
import { useLoaderData } from 'react-router-dom';
import { useSettingsStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { ProjectType } from '../../types';
import DeleteProjectModal from '../../components/private/modals/Delete-project-modal';
import CreateProjectModal from '../../components/private/modals/Create-project-modal';
import ProjectCard from '../../components/private/Project-card';
import formatDate from '../../utils/date-timestamp';
import EditProjectModal from '../../components/private/modals/Edit-project-modal';
import PageHeader from '../../components/private/ui/Page-header';

// eslint-disable-next-line react-refresh/only-export-components
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
  const [editModal, setEditModal] = useState<boolean>(false);
  // use it to know which project to delete
  const [projectId, setProjectId] = useState<string>('');
  // use it to knwo which project to edit (because in back we have a route that return all data from project by slug, so we use it to have all data form project hen we want to edit)
  const [projectSlug, setProjectSlug] = useState<string>('');

  // we use this state for better ui, when user delete/add/update a project we reflecte the db
  const [results, setResults] = useState<ProjectType[]>([]);

  useEffect(() => {
    setResults(projects);
  }, [projects]);

  function handleDeleteModal(id: string) {
    setProjectId(id);
    setDeleteModal(true);
  }

  function handleEditModal(slug: string) {
    setProjectSlug(slug);
    setEditModal(true);
  }

  function handleCreateModal() {
    setCreateModal(true);
  }

  return (
    <div>
      <PageHeader
        title="Vos projets"
        subtitle="Les projets que vous avez publiés sur Develup."
        action={
          <button
            type="button"
            className="dv-btn-primary"
            onClick={handleCreateModal}
          >
            <LuPlus aria-hidden className="text-lg" />
            Nouveau projet
          </button>
        }
      />
      {results?.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results?.map((result) => (
            <div key={result.id} className="flex flex-col gap-2">
              <ProjectCard project={result} />
              <div className="flex items-center justify-between px-1">
                <p className="dv-muted flex items-center gap-1.5 text-xs">
                  <LuCalendar aria-hidden />
                  Le {formatDate(result.created_at)}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="dv-icon-btn"
                    aria-label={`Modifier ${result.title}`}
                    onClick={() => handleEditModal(result.slug)}
                  >
                    <LuPencil />
                  </button>
                  <button
                    type="button"
                    className="dv-icon-btn hover:!bg-[#FDF1EE] hover:!text-[#B23A26] dark:hover:!bg-[#3A241F] dark:hover:!text-[#F08E7C]"
                    aria-label={`Supprimer ${result.title}`}
                    onClick={() => handleDeleteModal(result.id)}
                  >
                    <LuTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="dv-surface flex flex-col items-center px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-pollen text-2xl text-ink">
            <LuFolderKanban aria-hidden />
          </span>
          <p className="mt-5 font-display text-xl font-bold">
            Vous n&apos;avez pas encore créé de projet
          </p>
          <p className="dv-muted mt-1 max-w-sm">
            Publiez votre idée pour trouver des développeurs prêts à la
            construire avec vous.
          </p>
          <button
            type="button"
            className="dv-btn-primary mt-6"
            onClick={handleCreateModal}
          >
            <LuPlus aria-hidden className="text-lg" />
            Créer mon premier projet
          </button>
        </div>
      )}
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
      {editModal && (
        <EditProjectModal
          setModal={setEditModal}
          projectSlug={projectSlug}
          setProjectSlug={setProjectSlug}
          setResults={setResults}
        />
      )}
    </div>
  );
}
export default MyProjects;
