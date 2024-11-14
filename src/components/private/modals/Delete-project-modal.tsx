/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import axios from 'axios';
import { useState } from 'react';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
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
        <BackError message={errorMessage} />
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
