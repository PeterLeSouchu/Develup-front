import axios from 'axios';
import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoEyeOffOutline } from 'react-icons/io5';
import { useSettingsStore, useUserStore } from '../../store';
import BackError from '../../components/all/errors/Back-error';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import handleChangeTypePassword from '../../utils/password-visibility';
import LoaderWrapper from '../../components/all/loader/Loader-wrapper';
import AuthShell from '../../components/public/Auth-shell';

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
      <AuthShell
        title="Connexion"
        subtitle="Retrouvez vos projets et vos conversations."
        footer={
          <>
            Pas encore de compte ?{' '}
            <Link to="/signup" className="dv-link">
              S&apos;inscrire
            </Link>
          </>
        }
      >
        <form
          onSubmit={(e) => handlerSubmit(e)}
          className="flex flex-col gap-5"
        >
          <BackError message={errorMessage} />
          <div>
            <label className="dv-label" htmlFor="e-mail">
              E-mail
            </label>
            <input
              className="dv-input"
              type="text"
              id="e-mail"
              autoComplete="email"
              placeholder="vous@exemple.com"
              onChange={(e) => handlerChangeEmail(e)}
              value={emailInput}
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="dv-label mb-0" htmlFor="password">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="relative">
              <input
                className="dv-input pr-12"
                type={type}
                id="password"
                autoComplete="current-password"
                placeholder="Votre mot de passe"
                onChange={(e) => handlerChangePassword(e)}
                value={passwordInput}
              />
              <button
                type="button"
                aria-label={
                  type === 'password'
                    ? 'Afficher le mot de passe'
                    : 'Masquer le mot de passe'
                }
                onClick={() => handleChangeTypePassword(setType)}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-ink/5 hover:text-ink"
              >
                {type === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button className="dv-btn-primary mt-2 w-full" type="submit">
            Se connecter
          </button>
        </form>
      </AuthShell>

      {/* Popup pour "Plus disponible" */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="unavailable-title"
            className="w-full max-w-sm rounded-3xl bg-white2 p-7 font-body shadow-2xl"
          >
            <h3
              id="unavailable-title"
              className="font-display text-xl font-bold text-ink"
            >
              Fonctionnalité indisponible
            </h3>
            <p className="mb-6 mt-3 text-sm leading-relaxed text-muted">
              En tant que projet de portfolio gratuit, l&apos;envoi
              d&apos;emails n&apos;est plus disponible en production. Cette
              fonctionnalité nécessiterait un nom de domaine personnalisé et
              donc payant. Elle reste cependant fonctionnelle en développement
              local.
            </p>
            <button
              type="button"
              onClick={closePopup}
              className="dv-btn-dark w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </LoaderWrapper>
  );
}

export default Signin;
