/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { ProjectType } from '../../../types';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';

function DeleteProjectModal({
  setModal,
  projectId,
  setProjectId,
  setResults,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setProjectId: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}) {
  async function handleDeleteProject() {
    const { data } = await axiosWithCSRFtoken.delete(`/project/${projectId}`);
    const { id } = data.result;
    setResults((prev) => prev.filter((project) => project.id !== id));
    setProjectId('');
    setModal(false);
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
        className="p-3 z-50 bg-white rounded-lg max-w-80 flex justify-center items-center flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-center">
          Êtes-vous sûr de vouloir supprimer ce projet ?{' '}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="p-2 mt-5 bg-red-400  rounded-lg hover:bg-red-500 transition"
            onClick={() => setModal(false)}
          >
            annuler
          </button>
          <button
            type="button"
            className="p-2 mt-5 bg-green-400  rounded-lg hover:bg-green-500 transition"
            onClick={handleDeleteProject}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
