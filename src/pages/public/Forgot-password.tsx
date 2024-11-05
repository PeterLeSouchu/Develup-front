import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import image from '../../assets/images/logo.png';
import { useSettingsStore } from '../../store';
import LoaderWrapper from '../../components/Loader/Loader-wrapper';
import FrontError from '../../components/errors/FrontError';
import forgotPasswordSchema from '../../security/form-validation/forgot-password-schema';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import BackError from '../../components/errors/BackError';

function ForgotPassword() {
  const [linkSend, setLinkSend] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState();
  const { setLoading } = useSettingsStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Here in the catch, if email doesn't exist, back API send an error with 'Lien de réinitialisation du mot de passe envoyé' message, so we don't want user know that is an eror and we have to check it in the catch. If the error is this sentence, we just make a return so that BackError component doesn't show up.
  async function onSubmit(data: { email: string }) {
    try {
      setLoading(true);
      const res = await axiosWithoutCSRFtoken.post('/forgot-password', data);
      setResponse(res.data.message);
      setLinkSend((state) => !state);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const errorAPImessage = error.response?.data?.message;
        if (
          errorAPImessage === 'Lien de réinitialisation du mot de passe envoyé'
        ) {
          setLoading(false);
          return;
        }
        setErrorMessage(errorAPImessage);
        setLoading(false);
      }
    }
  }

  return (
    <LoaderWrapper>
      <div className="flex items-center justify-center p-10 min-h-80">
        {linkSend ? (
          <h1 className="text-lg text-center">{response}</h1>
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
              <BackError message={errorMessage} />
              <div className="flex flex-col gap-2 my-3 max-w-96">
                <label className="text-md text-center" htmlFor="e-mail">
                  Saisissez votre email, une demande de réinitialisation de mot
                  de passe vous sera envoyée par mail.
                </label>
                <input
                  className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                  type="text"
                  id="e-mail"
                  placeholder="Entrez votre adresse mail"
                  {...register('email')}
                />
                <FrontError
                  error={errors.email}
                  message={errors.email?.message}
                />
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
    </LoaderWrapper>
  );
}

export default ForgotPassword;
