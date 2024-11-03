import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoEyeOffOutline } from 'react-icons/io5';
import image from '../../assets/images/logo.png';
import { FormSignin } from '../../types';
import tryCatchWrapper from '../../security/Errors/try-catch-wrapper';
import { useUserStore } from '../../store';
import Error from '../../security/Errors/Error';
import {
  validateEmail,
  validatePassword,
} from '../../security/form-validation';

function Signin() {
  const [type, setType] = useState('password');
  const { setLogged } = useUserStore();

  function hanldeChangetype(): void {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignin>();

  async function onSubmit(data: FormSignin) {
    await tryCatchWrapper(async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/csrf-token`,
        {
          withCredentials: true,
        }
      );
      await axios.post(`${import.meta.env.VITE_API_URL}/api/signin`, data, {
        headers: {
          'x-csrf-token': res.data.csrfToken,
        },
        withCredentials: true,
      });
      setLogged(true);
    });
  }

  return (
    <div className="flex items-center justify-center p-10 min-h-80">
      <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80 max-w-lg p-10 flex flex-col items-center">
        <img className="w-1/4 min-w-36" src={image} alt="Logo-entier-Develup" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
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
                validate: validateEmail,
                minLength: { value: 2, message: '2 caractères au moins' },
              })}
            />
            <Error
              frontError={errors.email}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3 max-w-80 relative">
            <label className="text-md" htmlFor="mot-de-passe">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10"
                type={type}
                id="mot-de-passe"
                placeholder="Entrez votre mot de passe"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Le mot de passe est requis',
                  },
                  minLength: {
                    value: 8,
                    message:
                      'Le mot de passe doit contenir au moins 8 caractères',
                  },
                  validate: validatePassword,
                })}
              />
              <Error
                frontError={errors.password}
                errorMessage={errors.password?.message}
              />
              <button
                type="button"
                onClick={hanldeChangetype}
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
          <Link
            to="/forgot-password"
            className="underline underline-offset-2 mb-6"
          >
            Mot de passe oublié ?
          </Link>

          <button
            className="p-2 rounded-3xl bg-gold hover:bg-darkgold hover:text-white transition"
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
