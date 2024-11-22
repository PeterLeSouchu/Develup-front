/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import axios from 'axios';
import { useState } from 'react';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
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

  function handlerChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageInput(e.target.value);
  }

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!messageInput) {
      return setErrorMessageFront('Veuillez saisir au moins 1 caractère');
    }
    try {
      await axiosWithCSRFtoken.post('/open-conversation', {
        message: messageInput,
        projectId,
        userIdCreated: userId,
      });
      setErrorMessageFront('');
      setErrorMessageBack('');

      return setModal(false);
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
    <div
      aria-label="close modal"
      onKeyDown={() => setModal(false)}
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center cursor-default"
      onClick={() => setModal(false)}
    >
      <div
        className="p-3 z-50 bg-white rounded-lg max-w-80 flex dark:text-black justify-center items-center flex-col shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <form className="p-4" onSubmit={(e) => handleSendMessage(e)}>
          <BackError message={errorMessageBack} />
          <div className="flex flex-col gap-2 mb-3 w-18">
            <label className="text-center text-md mb-6" htmlFor="password">
              Message :
            </label>

            <textarea
              className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10 resize-none w-full"
              id="message"
              placeholder="Envoyez-lui un message ..."
              onChange={(e) => handlerChangeMessage(e)}
              value={messageInput}
            />
            {errorMessageFront && (
              <p className=" text-red-500 text-sm">{errorMessageFront}</p>
            )}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              className="p-2 mt-5 bg-red-400  rounded-lg hover:bg-red-500 transition"
              onClick={() => setModal(false)}
            >
              annuler
            </button>
            <button
              type="submit"
              className="p-2 mt-5 bg-green-400  rounded-lg hover:bg-green-500 transition"
            >
              envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessageModal;
