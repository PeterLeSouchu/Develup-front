import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore, useUserStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
import ModalShell from '../ui/Modal-shell';
import PasswordField from '../ui/Password-field';
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
    <ModalShell
      title="Supprimer mon compte"
      onClose={() => setModal(false)}
      size="sm"
    >
      <form onSubmit={(e) => handleDeleteAccount(e)}>
        <BackError message={errorMessage} />
        <p className="dv-muted mb-5 leading-relaxed">
          Cette action est définitive. Entrez votre mot de passe pour confirmer
          la suppression de votre compte.
        </p>
        <PasswordField
          id="password"
          label="Mot de passe"
          type={type}
          onToggle={() => handleChangeTypePassword(setType)}
          inputProps={{
            onChange: (e) => handlerChangePassword(e),
            value: passwordInput,
          }}
        />
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="dv-btn-ghost"
            onClick={() => setModal(false)}
          >
            Annuler
          </button>
          <button type="submit" className="dv-btn-danger">
            Supprimer mon compte
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default DeleteAccountModal;
