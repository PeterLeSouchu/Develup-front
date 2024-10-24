import { useForm } from 'react-hook-form';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useState } from 'react';
import { FormValues } from '../../types';

import image from '../../assets/images/logo.png';

function Signup() {
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function hanldeChangetypePassword(): void {
    setTypePassword((prevType) =>
      prevType === 'password' ? 'text' : 'password'
    );
  }
  function hanldeChangetypeConfirmPassword(): void {
    setTypeConfirmPassword((prevType) =>
      prevType === 'password' ? 'text' : 'password'
    );
  }
  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-84 p-10 ">
      <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80  max-w-lg p-8 flex flex-col items-center ">
        <img className="w-1/4 min-w-36" src={image} alt="Logo-entier-Develup" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col gap-2 my-3 max-w-96">
            <label className="text-md" htmlFor="e-mail">
              E-mail
            </label>
            <input
              className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
              type="text"
              id="e-mail"
              placeholder="Entrez votre adresse mail"
              {...register('email', {
                required: { value: true, message: "L'email est requis" },
                minLength: { value: 2, message: '2 caracteres au moins' },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-3 max-w-96">
            <label className="text-md" htmlFor="pseudo">
              Pseudo
            </label>
            <input
              className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
              type="text"
              id="pseudo"
              placeholder="Entrez votre pseudo"
              {...register('pseudo', { required: true })}
            />
            {errors.pseudo && (
              <p className="text-red-600 text-sm">Le pseudo est requis</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-3 max-w-80 ">
            <label className="text-md" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10"
                type={typePassword}
                id="password"
                placeholder="Entrez votre mot de passe"
                {...register('password', { required: true })}
              />
              <button
                type="button"
                onClick={hanldeChangetypePassword}
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
              <p className="text-red-600 text-sm">Le mot de passe est requis</p>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-3 max-w-80 ">
            <label className="text-md" htmlFor="confirm-password">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10 "
                type={typeConfirmPassword}
                id="confirm-password"
                placeholder="Confirmer votre mot de passe"
                {...register('confirmPassword', { required: true })}
              />
              <button
                type="button"
                onClick={hanldeChangetypeConfirmPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {typeConfirmPassword === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">Le mot de passe est requis</p>
            )}
          </div>

          <button
            className="p-2 rounded-3xl bg-gold hover:bg-darkgold hover:text-white transition"
            type="submit"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
