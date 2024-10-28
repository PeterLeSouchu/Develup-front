import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import image from '../../assets/images/logo.png';
import tryCatchWrapper from '../../utils/try-catch-wrapper';

function ForgotPassword() {
  const [linkSend, setLinkSend] = useState<boolean>(false);
  const [mail, setMail] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  async function onSubmit(data: { email: string }) {
    console.log('le formulaire est soumis');
    await tryCatchWrapper(async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forgot-password`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setMail(data.email);
      setLinkSend((state) => !state);
    });
  }

  return (
    <div className="flex items-center justify-center p-10 min-h-80">
      {linkSend ? (
        <h1>Lien envoyé à l&apos;adresse : {mail}</h1>
      ) : (
        <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80 max-w-lg p-10 flex flex-col items-center">
          <img
            className="w-1/4 min-w-36"
            src={image}
            alt="Logo-entier-Develup"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center mt-5"
          >
            <div className="flex flex-col gap-2 my-3 max-w-96">
              <label className="text-md text-center" htmlFor="e-mail">
                Saisissez votre email, une demande de réinitialisation de mot de
                passe vous sera envoyée par mail.
              </label>
              <input
                className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                type="text"
                id="e-mail"
                placeholder="Entrez votre adresse mail"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Le champ email est requis',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
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
      )}
    </div>
  );
}

export default ForgotPassword;
