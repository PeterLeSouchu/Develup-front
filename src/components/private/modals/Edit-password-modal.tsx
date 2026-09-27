import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
import ModalShell from '../ui/Modal-shell';
import PasswordField from '../ui/Password-field';
import { DeleteAccountModalType, EditPasswordFormType } from '../../../types';
import handleChangeTypePassword from '../../../utils/password-visibility';
import HookFormError from '../../all/errors/Hook-form-error';
import editPasswordSchema from '../../../security/form-validation/edit-password-schema';

function EditPasswordModal({ setModal }: DeleteAccountModalType) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setGlobalErrorMessage } = useSettingsStore();
  const [typePassword, setTypePassword] = useState('password');
  const [typeNewPassword, setTypeNewPassword] = useState('password');
  const [typeNewPasswordConfirm, setTypeNewPasswordConfirm] =
    useState('password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordFormType>({
    resolver: zodResolver(editPasswordSchema),
  });

  async function onSubmit(data: EditPasswordFormType) {
    try {
      await axiosWithCSRFtoken.post('/edit-password', data);
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
      title="Modifier mon mot de passe"
      onClose={() => setModal(false)}
      size="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BackError message={errorMessage} />
        <div className="flex flex-col gap-5">
          <div>
            <PasswordField
              id="password"
              label="Mot de passe actuel"
              type={typePassword}
              onToggle={() => handleChangeTypePassword(setTypePassword)}
              inputProps={register('password')}
            />
            <HookFormError
              error={errors.password}
              message={errors.password?.message}
            />
          </div>
          <div>
            <PasswordField
              id="newPassword"
              label="Nouveau mot de passe"
              type={typeNewPassword}
              onToggle={() => handleChangeTypePassword(setTypeNewPassword)}
              inputProps={register('newPassword')}
            />
            <HookFormError
              error={errors.newPassword}
              message={errors.newPassword?.message}
            />
          </div>
          <div>
            <PasswordField
              id="newPasswordConfirm"
              label="Confirmez le nouveau mot de passe"
              type={typeNewPasswordConfirm}
              onToggle={() =>
                handleChangeTypePassword(setTypeNewPasswordConfirm)
              }
              inputProps={register('newPasswordConfirm')}
            />
            <HookFormError
              error={errors.newPasswordConfirm}
              message={errors.newPasswordConfirm?.message}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="dv-btn-ghost"
            onClick={() => setModal(false)}
          >
            Annuler
          </button>
          <button type="submit" className="dv-btn-primary">
            Enregistrer
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default EditPasswordModal;
