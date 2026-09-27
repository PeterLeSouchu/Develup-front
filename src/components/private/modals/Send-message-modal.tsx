import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
import ModalShell from '../ui/Modal-shell';
import { SendMessageModalType } from '../../../types';

function SendMessageModal({
  setModal,
  projectId,
  userId,
}: SendMessageModalType) {
  const [errorMessageBack, setErrorMessageBack] = useState<string>('');
  const [errorMessageFront, setErrorMessageFront] = useState<string>('');
  const { setGlobalErrorMessage } = useSettingsStore();
  const [messageInput, setMessageInput] = useState('');
  const navigate = useNavigate();

  function handlerChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageInput(e.target.value);
  }

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!messageInput) {
      return setErrorMessageFront('Veuillez saisir au moins 1 caractère');
    }
    try {
      const { data } = await axiosWithCSRFtoken.post('/open-conversation', {
        message: messageInput,
        projectId,
        userIdCreated: userId,
      });
      setErrorMessageFront('');
      setErrorMessageBack('');
      setModal(false);
      const conversationId = data.result;
      return navigate(`/dashboard/conversation/${conversationId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message === 'Votre session a expiré, veuillez vous reconnecter') {
          return setGlobalErrorMessage(message);
        }
        return setErrorMessageBack(message);
      }
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }

  return (
    <ModalShell
      title="Contacter l'auteur"
      onClose={() => setModal(false)}
      size="sm"
    >
      <form onSubmit={(e) => handleSendMessage(e)}>
        <BackError message={errorMessageBack} />
        <label className="dv-label" htmlFor="message">
          Votre message
        </label>
        <textarea
          className="dv-input h-auto resize-none py-3 leading-relaxed"
          id="message"
          rows={5}
          placeholder="Présentez-vous et dites ce qui vous intéresse dans ce projet"
          onChange={(e) => handlerChangeMessage(e)}
          value={messageInput}
        />
        {errorMessageFront && (
          <p className="mt-1 text-sm text-red-600">{errorMessageFront}</p>
        )}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="dv-btn-ghost"
            onClick={() => setModal(false)}
          >
            Annuler
          </button>
          <button type="submit" className="dv-btn-primary">
            Envoyer
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default SendMessageModal;
