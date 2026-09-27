import axios from 'axios';
import { useState } from 'react';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
import ModalShell from '../ui/Modal-shell';
import { DeleteModalType } from '../../../types';

function DeleteProjectModal({
  setModal,
  projectId,
  setProjectId,
  setResults,
}: DeleteModalType) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setGlobalErrorMessage } = useSettingsStore();

  async function handleDeleteProject() {
    try {
      const { data } = await axiosWithCSRFtoken.delete(`/project/${projectId}`);
      const { id } = data.result;
      setResults((prev) => prev.filter((project) => project.id !== id));
      setProjectId('');
      return setModal(false);
    } catch (error) {
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
      title="Supprimer ce projet ?"
      onClose={() => setModal(false)}
      size="sm"
    >
      <p className="dv-muted leading-relaxed">
        Le projet et ses informations seront définitivement supprimés.
      </p>
      <BackError message={errorMessage} />
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="dv-btn-ghost"
          onClick={() => setModal(false)}
        >
          Annuler
        </button>
        <button
          type="button"
          className="dv-btn-danger"
          onClick={handleDeleteProject}
        >
          Supprimer le projet
        </button>
      </div>
    </ModalShell>
  );
}

export default DeleteProjectModal;
