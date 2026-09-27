import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormSignupType } from '../../types';
import { useUserStore, useSettingsStore } from '../../store';
import handleChangeTypePassword from '../../utils/password-visibility';
import LoaderWrapper from '../../components/all/loader/Loader-wrapper';
import AuthShell from '../../components/public/Auth-shell';
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
  // const [otpModal, setOtpModal] = useState<boolean>(false);

  // change state connected to true
  const { setLogged } = useUserStore();

  // Display loader beacause nodemail take a lot of time
  const { setLoading } = useSettingsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupType>({ resolver: zodResolver(signupSchema) });

  // const {
  //   register: registerOtp,
  //   handleSubmit: handleSubmitOtp,
  //   formState: { errors: errorOtp },
  // } = useForm<{ userOTPcode: string }>({
  //   resolver: zodResolver(otpCodeSchema),
  // });

  async function onSubmit(data: FormSignupType) {
    try {
      setLoading(true);
      // await axiosWithoutCSRFtoken.post('/signup/otp', data);
      // setOtpModal((state) => !state);
      await axiosWithoutCSRFtoken.post('/signup/register', data);
      const { data: dataResponse } =
        await axiosWithoutCSRFtoken.get('/csrf-token');
      const { csrfToken } = dataResponse;
      localStorage.setItem('csrfToken', csrfToken);
      setErrorMessage('');
      setLogged(true);
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

  // async function onSubmitOTP(data: { userOTPcode: string }) {
  //   try {
  //     await axiosWithoutCSRFtoken.post('/signup/register', data);
  //     const { data: dataResponse } =
  //       await axiosWithoutCSRFtoken.get('/csrf-token');
  //     const { csrfToken } = dataResponse;
  //     localStorage.setItem('csrfToken', csrfToken);
  //     return setLogged(true);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const errorAPImessage = error.response?.data?.message;
  //       return setErrorMessage(errorAPImessage);
  //     }
  //     return setErrorMessage('Erreur inattendu');
  //   }
  // }

  return (
    <LoaderWrapper>
      <AuthShell
        title="Créer un compte"
        subtitle="Rejoignez des projets ou lancez le vôtre, gratuitement."
        footer={
          <>
            Déjà inscrit ?{' '}
            <Link to="/login" className="dv-link">
              Se connecter
            </Link>
          </>
        }
      >
        {/* {otpModal ? ( */}
        {/* <div>
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
        ) : ( */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <BackError message={errorMessage} />
          <div>
            <label className="dv-label" htmlFor="email">
              E-mail
            </label>
            <input
              className="dv-input"
              type="email"
              id="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              {...register('email')}
            />
            <HookFormError
              error={errors.email}
              message={errors.email?.message}
            />
          </div>
          <div>
            <label className="dv-label" htmlFor="pseudo">
              Pseudo
            </label>
            <input
              className="dv-input"
              type="text"
              id="pseudo"
              autoComplete="username"
              placeholder="Le nom visible par les autres membres"
              {...register('pseudo')}
            />
            <HookFormError
              error={errors.pseudo}
              message={errors.pseudo?.message}
            />
          </div>
          <div>
            <label className="dv-label" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="dv-input pr-12"
                type={typePassword}
                id="password"
                autoComplete="new-password"
                placeholder="Choisissez un mot de passe"
                {...register('password')}
              />
              <button
                type="button"
                aria-label={
                  typePassword === 'password'
                    ? 'Afficher le mot de passe'
                    : 'Masquer le mot de passe'
                }
                onClick={() => handleChangeTypePassword(setTypePassword)}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-ink/5 hover:text-ink"
              >
                {typePassword === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5" />
                )}
              </button>
            </div>
            <HookFormError
              error={errors.password}
              message={errors.password?.message}
            />
          </div>
          <div>
            <label className="dv-label" htmlFor="confirm-password">
              Confirmation du mot de passe
            </label>
            <div className="relative">
              <input
                className="dv-input pr-12"
                type={typeConfirmPassword}
                id="confirm-password"
                autoComplete="new-password"
                placeholder="Saisissez-le à nouveau"
                {...register('passwordConfirm')}
              />
              <button
                type="button"
                aria-label={
                  typeConfirmPassword === 'password'
                    ? 'Afficher le mot de passe'
                    : 'Masquer le mot de passe'
                }
                onClick={() => handleChangeTypePassword(setTypeConfirmPassword)}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-ink/5 hover:text-ink"
              >
                {typeConfirmPassword === 'password' ? (
                  <MdOutlineRemoveRedEye className="h-5 w-5" />
                ) : (
                  <IoEyeOffOutline className="h-5 w-5" />
                )}
              </button>
            </div>
            <HookFormError
              error={errors.passwordConfirm}
              message={errors.passwordConfirm?.message}
            />
          </div>
          <div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="cgu"
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-ink"
                {...register('cgu')}
              />
              <label htmlFor="cgu" className="text-sm leading-snug text-ink">
                J&apos;accepte les{' '}
                <Link
                  to="/general-conditions-of-use"
                  target="blank"
                  className="dv-link"
                >
                  conditions générales d&apos;utilisation
                </Link>
              </label>
            </div>
            <HookFormError error={errors.cgu} message={errors.cgu?.message} />
          </div>
          <button className="dv-btn-primary mt-2 w-full" type="submit">
            S&apos;inscrire
          </button>
        </form>
        {/* )} */}
      </AuthShell>
    </LoaderWrapper>
  );
}
export default Signup;
