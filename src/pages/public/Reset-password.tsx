import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoEyeOffOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import image from '../../assets/images/logo.png';
import tryCatchWrapper from '../../utils/try-catch-wrapper';
import { ResetPasswordForm } from '../../types';
import {
  hanldeChangetypeConfirmPassword,
  hanldeChangetypePassword,
} from '../../utils/Password-visibility';

function ResetPassword() {
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  async function onSubmit(data: ResetPasswordForm) {
    await tryCatchWrapper(async () => {
      if (data.password !== data.passwordConfirm) {
        console.log('les mots de passe ne correspondent pas');
      }
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/reset-password`,
        { ...data, token },
        {
          withCredentials: true,
        }
      );
      navigate('/login');
    });
  }

  return (
    <div className="flex items-center justify-center p-10 min-h-80">
      <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80 max-w-lg p-10 flex flex-col items-center">
        <img className="w-1/4 min-w-36" src={image} alt="Logo-entier-Develup" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center mt-5"
        >
          <div className="flex flex-col gap-2 mb-3 max-w-80 ">
            <label className="text-md" htmlFor="password">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10"
                type={typePassword}
                id="password"
                placeholder="Entrez votre mot de passe"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Le mot de passe est requis',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => hanldeChangetypePassword(setTypePassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {typePassword === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-3 max-w-80 ">
            <label className="text-md" htmlFor="passwordConfirm">
              Confirmation du mot de passe
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10"
                type={typeConfirmPassword}
                id="passwordConfirm"
                placeholder="Entrez votre mot de passe"
                {...register('passwordConfirm', {
                  required: {
                    value: true,
                    message: 'Le mot de passe est requis',
                  },
                })}
              />
              <button
                type="button"
                onClick={() =>
                  hanldeChangetypeConfirmPassword(setTypeConfirmPassword)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {typeConfirmPassword === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            className="p-2 rounded-3xl bg-gold hover:bg-darkgold hover:text-white transition"
            type="submit"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
