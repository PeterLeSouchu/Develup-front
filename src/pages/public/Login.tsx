import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoEyeOffOutline } from 'react-icons/io5';
import image from '../../assets/images/logo.png';

function Login() {
  const [type, setType] = useState('password');

  function hanldeChangetype(): void {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }

  return (
    <div className="flex items-center justify-center h-84">
      <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80 max-w-lg p-10 flex flex-col items-center">
        <img className="w-1/2 min-w-60" src={image} alt="Logo-entier-Develup" />
        <form className="w-full flex flex-col items-center">
          <div className="flex flex-col gap-2 my-8 max-w-96">
            <label className="text-lg" htmlFor="e-mail">
              E-mail
            </label>
            <input
              className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
              type="text"
              id="e-mail"
              placeholder="Entrez votre adresse mail"
            />
          </div>
          <div className="flex flex-col gap-2 mb-8 max-w-80 relative">
            <label className="text-lg" htmlFor="mot-de-passe">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="border-2 rounded-md border-none bg-slate-200  outline-none p-2 pr-10"
                type={type}
                id="mot-de-passe"
                placeholder="Entrez votre mot de passe"
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
            to="/forget-password"
            className="underline underline-offset-2 mb-6"
          >
            Mot de passe oublié ?
          </Link>

          <button
            className="p-2 rounded-3xl bg-gold hover:bg-darkgold hover:text-white transition"
            type="button"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
