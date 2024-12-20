import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormSignupType } from '../../types';
import image from '../../assets/images/logo.png';
import { useUserStore, useSettingsStore } from '../../store';
import handleChangeTypePassword from '../../utils/password-visibility';
import LoaderWrapper from '../../components/all/loader/Loader-wrapper';
import HookFormError from '../../components/all/errors/Hook-form-error';
import signupSchema from '../../security/form-validation/signup-schema';
import otpCodeSchema from '../../security/form-validation/otp-code-schema';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import BackError from '../../components/all/errors/Back-error';

function Signup() {
  // Change password input to text
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

  const [errorMessage, setErrorMessage] = useState('');

  // Display otp form
  const [otpModal, setOtpModal] = useState<boolean>(false);

  // change state connected to true
  const { setLogged } = useUserStore();

  // Display loader beacause nodemail take a lot of time
  const { setLoading } = useSettingsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupType>({ resolver: zodResolver(signupSchema) });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorOtp },
  } = useForm<{ userOTPcode: string }>({
    resolver: zodResolver(otpCodeSchema),
  });

  async function onSubmit(data: FormSignupType) {
    try {
      setLoading(true);
      await axiosWithoutCSRFtoken.post('/signup/otp', data);
      setOtpModal((state) => !state);
      setErrorMessage('');
      return setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorAPImessage = error.response?.data?.message;
        setErrorMessage(errorAPImessage);
        return setLoading(false);
      }
      setLoading(false);
      return setErrorMessage('Erreur inattendu');
    }
  }

  async function onSubmitOTP(data: { userOTPcode: string }) {
    try {
      await axiosWithoutCSRFtoken.post('/signup/register', data);
      const { data: dataResponse } =
        await axiosWithoutCSRFtoken.get('/csrf-token');
      const { csrfToken } = dataResponse;
      localStorage.setItem('csrfToken', csrfToken);
      return setLogged(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorAPImessage = error.response?.data?.message;
        return setErrorMessage(errorAPImessage);
      }
      return setErrorMessage('Erreur inattendu');
    }
  }

  return (
    <LoaderWrapper>
      <div className="flex items-center justify-center p-10 min-h-80 ">
        <div className="border-2 border-lightgold shadow-xl rounded-lg bg-white w-5/12 min-w-80 max-w-lg p-4 flex flex-col items-center ">
          <img
            className="w-1/4 min-w-36"
            src={image}
            alt="Logo-entier-Develup"
          />
          {otpModal ? (
            <div>
              <form
                className="flex flex-col items-center"
                onSubmit={handleSubmitOtp(onSubmitOTP)}
              >
                <BackError message={errorMessage} />
                <div className="flex flex-col gap-2 my-3 w-18">
                  <label className="text-md" htmlFor="otp">
                    Entrez le code OTP reçu par mail
                  </label>
                  <input
                    className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                    type="text"
                    id="otp"
                    placeholder="Entrez le code OTP"
                    {...registerOtp('userOTPcode')}
                  />
                  <HookFormError
                    error={errorOtp.userOTPcode}
                    message={errorOtp.userOTPcode?.message}
                  />
                </div>
                <button
                  className="p-2 rounded-3xl bg-gold hover:bg-darkgold hover:text-white transition"
                  type="submit"
                >
                  Valider
                </button>
              </form>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <BackError message={errorMessage} />
              <div className="flex flex-col gap-2 my-3 w-18">
                <label className="text-md" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                  type="email"
                  id="email"
                  placeholder="Entrez votre adresse mail"
                  {...register('email')}
                />
                <HookFormError
                  error={errors.email}
                  message={errors.email?.message}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3 w-18">
                <label className="text-md" htmlFor="pseudo">
                  Pseudo
                </label>
                <input
                  className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                  type="text"
                  id="pseudo"
                  placeholder="Entrez votre pseudo"
                  {...register('pseudo')}
                />
                <HookFormError
                  error={errors.pseudo}
                  message={errors.pseudo?.message}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3 w-18 ">
                <label className="text-md" htmlFor="password">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10 w-full"
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
              <div className="flex flex-col gap-2 mb-3 w-18 ">
                <label className="text-md" htmlFor="confirm-password">
                  Confirmation du mot de passe
                </label>
                <div className="relative">
                  <input
                    className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10 w-full "
                    type={typeConfirmPassword}
                    id="confirm-password"
                    placeholder="Entrez votre mot de passe"
                    {...register('passwordConfirm')}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleChangeTypePassword(setTypeConfirmPassword)
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
                <HookFormError
                  error={errors.passwordConfirm}
                  message={errors.passwordConfirm?.message}
                />
              </div>
              <div className="mb-5 flex max-w-80">
                <input type="checkbox" id="cgu" {...register('cgu')} />
                <label htmlFor="cgu" className="ml-3 ">
                  J&apos;accepte les{' '}
                  <Link to="/general-conditions-of-use" className="underline">
                    conditions générales d&apos;utilisation
                  </Link>
                </label>
              </div>
              <HookFormError error={errors.cgu} message={errors.cgu?.message} />
              <button
                className="p-2 rounded-3xl bg-gold hover:bg-darkgold  transition"
                type="submit"
              >
                S&apos;inscrire
              </button>
            </form>
          )}
        </div>
      </div>
    </LoaderWrapper>
  );
}
export default Signup;
