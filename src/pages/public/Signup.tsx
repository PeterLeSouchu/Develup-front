import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormSignup } from '../../types';
import image from '../../assets/images/logo.png';
import tryCatchWrapper from '../../security/try-catch-wrapper';
import { useUserStore, useSettingsStore } from '../../store';
import hanldeChangetypePassword from '../../utils/Password-visibility';
import LoaderWrapper from '../../utils/Loader-wrapper';
import {
  validateEmail,
  validatePassword,
} from '../../security/form-validation';

function Signup() {
  // Change password input to text
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

  // Display otp form
  const [otpModal, setOtpModal] = useState<boolean>(false);

  // change state connected to true
  const { changeLogged } = useUserStore();

  // Display loader beacause nodemail take a lot of time
  const { changeLoading } = useSettingsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignup>();

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorOtp },
  } = useForm<{ userOTPcode: string }>();

  async function onSubmit(data: FormSignup) {
    await tryCatchWrapper(async () => {
      changeLoading();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup/otp`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setOtpModal((state) => !state);
      changeLoading();
    });
  }

  async function onSubmitOTP(data: { userOTPcode: string }) {
    await tryCatchWrapper(async () => {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup/register`,
        data,
        {
          withCredentials: true,
        }
      );
      changeLogged();
    });
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
                <div className="flex flex-col gap-2 my-3 max-w-96">
                  <label className="text-md" htmlFor="otp">
                    Entrez le code OTP reçu par mail
                  </label>
                  <input
                    className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                    type="text"
                    id="otp"
                    placeholder="Entrez le code OTP"
                    {...registerOtp('userOTPcode', {
                      required: {
                        value: true,
                        message: 'Saisissez le code OTP reçu par mail',
                      },
                      minLength: { value: 6, message: '6 caractères au moins' },
                    })}
                  />
                  {errorOtp.userOTPcode && (
                    <p className="text-red-600 text-sm">
                      {errorOtp.userOTPcode.message}
                    </p>
                  )}
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
              <div className="flex flex-col gap-2 my-3 w-18">
                <label className="text-md" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="border-2 rounded-md border-none bg-slate-200 outline-none p-2 pr-10"
                  type="email"
                  id="email"
                  placeholder="Entrez votre adresse mail"
                  {...register('email', {
                    required: { value: true, message: "L'email est requis" },
                    validate: validateEmail,
                    minLength: { value: 2, message: '2 caractères au moins' },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
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
                  {...register('pseudo', { required: true })}
                />
                {errors.pseudo && (
                  <p className="text-red-600 text-sm">Le pseudo est requis</p>
                )}
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
                    {...register('password', {
                      required: true,
                      validate: validatePassword,
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
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
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
                    placeholder="Confirmez votre mot de passe"
                    {...register('passwordConfirm', {
                      required: true,
                      validate: validatePassword,
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      hanldeChangetypePassword(setTypeConfirmPassword)
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
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-5 flex max-w-80">
                <input
                  type="checkbox"
                  id="cgu"
                  {...register('cgu', {
                    required: {
                      value: true,
                      message: 'Veuillez accepter les CGU',
                    },
                  })}
                />
                <label htmlFor="cgu" className="ml-3 ">
                  J&apos;accepte les{' '}
                  <Link to="/general-conditions-of-use" className="underline">
                    conditions générales d&apos;utilisation
                  </Link>
                </label>
              </div>
              {errors.cgu && (
                <p className="text-red-600 mb-5 text-sm">
                  {errors.cgu.message}
                </p>
              )}
              <button
                className="p-2 rounded-3xl bg-gold hover:bg-darkgold hover:text-white transition"
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
