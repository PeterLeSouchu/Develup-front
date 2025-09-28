import axios from 'axios';
import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoEyeOffOutline } from 'react-icons/io5';
import image from '../../assets/images/logo.png';
import { useSettingsStore, useUserStore } from '../../store';
import BackError from '../../components/all/errors/Back-error';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import handleChangeTypePassword from '../../utils/password-visibility';
import LoaderWrapper from '../../components/all/loader/Loader-wrapper';

function Signin() {
  const [type, setType] = useState('password');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const { setLogged } = useUserStore();
  const { setLoading } = useSettingsStore();

  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosWithoutCSRFtoken.post('/signin', {
        email: emailInput,
        password: passwordInput,
      });
      const { data } = await axiosWithoutCSRFtoken.get('/csrf-token');
      const { csrfToken } = data;
      localStorage.setItem('csrfToken', csrfToken);
      setLoading(false);
      return setLogged(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorAPImessage = error.response?.data?.message;
        setLoading(false);
        return setErrorMessage(errorAPImessage);
      }
      setLoading(false);
      return setErrorMessage('Erreur inattendu');
    }
  }

  function handlerChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
  }

  function handlerChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordInput(e.target.value);
  }

  function handleForgotPasswordClick(e: React.MouseEvent) {
    e.preventDefault();
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
  }

  return (
    <LoaderWrapper>
      <div className="flex items-center justify-center p-10 min-h-80">
        <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80 max-w-lg p-10 flex flex-col items-center">
          <img
            className="w-1/4 min-w-36"
            src={image}
            alt="Logo-entier-Develup"
          />
          <form
            onSubmit={(e) => handlerSubmit(e)}
            className="w-full flex flex-col items-center"
          >
            <BackError message={errorMessage} />
            <div className="flex flex-col gap-2 my-3 w-18">
              <label className="text-md" htmlFor="e-mail">
                E-mail
              </label>
              <input
                className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                type="text"
                id="e-mail"
                placeholder="Entrez votre adresse mail"
                onChange={(e) => handlerChangeEmail(e)}
                value={emailInput}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3 w-18">
              <label className="text-md" htmlFor="password">
                Mot de passe
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

            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="underline underline-offset-2 mb-6"
            >
              Mot de passe oublié ?
            </button>

            <button
              className="p-2 rounded-3xl bg-gold hover:bg-darkgold  transition"
              type="submit"
            >
              Se connecter
            </button>
          </form>
        </div>

        {/* Popup pour "Plus disponible" */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Fonctionnalité indisponible
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                En tant que projet de portfolio gratuit, l'envoi d'emails n'est
                plus disponible en production. Cette fonctionnalité
                nécessiterait un nom de domaine personnalisé et donc payant.
                Elle reste cependant fonctionnelle en développement local.
              </p>
              <button
                onClick={closePopup}
                className="w-full p-2 rounded-3xl bg-gold hover:bg-darkgold transition"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </LoaderWrapper>
  );
}

export default Signin;
