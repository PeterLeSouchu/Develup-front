/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import axios from 'axios';
import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoEyeOffOutline } from 'react-icons/io5';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../../store';
import BackError from '../../all/errors/Back-error';
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
    <div
      aria-label="close modal"
      onKeyDown={() => setModal(false)}
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center cursor-default"
      onClick={() => setModal(false)}
    >
      <div
        className="p-3 z-50 bg-white rounded-lg max-w-80 flex justify-center dark:text-black items-center flex-col shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <BackError message={errorMessage} />
          <div className="flex flex-col gap-2 mb-3 w-18">
            <div className="flex flex-col gap-2 mb-3 w-18">
              <label className="text-md" htmlFor="password">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10 w-full"
                  type={typePassword}
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => handleChangeTypePassword(setTypePassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {typePassword === 'password' ? (
                    <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <HookFormError
                error={errors.password}
                message={errors.password?.message}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3 w-18">
              <label className="text-md" htmlFor="newPassword">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10 w-full"
                  type={typeNewPassword}
                  id="newPassword"
                  placeholder="Entrez votre mot de passe"
                  {...register('newPassword')}
                />

                <button
                  type="button"
                  onClick={() => handleChangeTypePassword(setTypeNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {typeNewPassword === 'password' ? (
                    <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <HookFormError
                error={errors.newPassword}
                message={errors.newPassword?.message}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3 w-18">
              <label className="text-md" htmlFor="newPasswordConfirm">
                Confirmez le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10 w-full"
                  type={typeNewPasswordConfirm}
                  id="newPasswordConfirm"
                  placeholder="Entrez votre mot de passe"
                  {...register('newPasswordConfirm')}
                />

                <button
                  type="button"
                  onClick={() =>
                    handleChangeTypePassword(setTypeNewPasswordConfirm)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {typeNewPasswordConfirm === 'password' ? (
                    <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <HookFormError
                error={errors.newPasswordConfirm}
                message={errors.newPasswordConfirm?.message}
              />
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
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPasswordModal;
