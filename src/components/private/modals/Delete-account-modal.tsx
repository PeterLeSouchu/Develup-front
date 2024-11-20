/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import axios from 'axios';
import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline } from 'react-icons/io5';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore, useUserStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
import { DeleteAccountModalType } from '../../../types';
import handleChangeTypePassword from '../../../utils/password-visibility';

function DeleteAccountModal({ setModal }: DeleteAccountModalType) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setGlobalErrorMessage } = useSettingsStore();
  const [type, setType] = useState('password');
  const [passwordInput, setPasswordInput] = useState('');
  const { setDarkTheme, setLogged } = useUserStore();
  const navigate = useNavigate();

  function handlerChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordInput(e.target.value);
  }

  async function handleDeleteAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axiosWithCSRFtoken.post('/delete-account', {
        password: passwordInput,
      });
      setLogged(false);
      setDarkTheme(false);
      localStorage.removeItem('csrfToken');
      localStorage.removeItem('user-storage');
      setModal(false);
      return navigate('/');
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
        onKeyDown={(event) => event.stopPropagation()}
      >
        <form className="p-4" onSubmit={(e) => handleDeleteAccount(e)}>
          <BackError message={errorMessage} />
          <div className="flex flex-col gap-2 mb-3 w-18">
            <label className="text-center text-md mb-6" htmlFor="password">
              Entrez votre mot de passe pour supprimer définitivement votre
              compte
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10 w-full"
                type={type}
                id="password"
                placeholder="Entrez votre mot de passe"
                onChange={(e) => handlerChangePassword(e)}
                value={passwordInput}
              />
              <button
                type="button"
                onClick={() => handleChangeTypePassword(setType)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {type === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
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
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
