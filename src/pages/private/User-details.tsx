import axios from 'axios';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import { UserType } from '../../types';
import defautUserImage from '../../assets/images/default-user-image.png';

export const loadUserDetails = async ({ params }: LoaderFunctionArgs) => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithoutCSRFtoken.get(`/user/${params.slug}`);
    const user = data.result;

    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      setGlobalErrorMessage(message);
      return 'erreur inattendu';
    }
    setGlobalErrorMessage('Erreur innatendu, essayez de vous reconnecter');
    return 'erreur inattendu';
  }
};

function UserDetails() {
  const user = useLoaderData() as UserType;
  return (
    <div className="px-10">
      <div className="flex md:flex-row flex-col justify-around md:h-64 mb-14 mdmb-14">
        <img
          className=" md:mx-0   dark:bg-slate-200 p-1 rounded-full   mx-auto w-64 h-64 md:mb-0 mb-10 object-cover"
          src={user.image || defautUserImage}
          alt={user.pseudo}
        />
        <div className="flex flex-col md:w-1/2 md:items-center justify-center gap-3 md:gap-7   dark:text-white2  rounded-lg md:max-w-xl">
          <h1 className=" md:text-center w-full md:text-5xl text-4xl font-bol break-words">
            {user.pseudo}
          </h1>
          <p className=" text-xl  rounded-xl  max-w-64 italic ">
            {user.type || 'Développeur'}
          </p>
        </div>
      </div>

      {user.techno.length > 0 ? (
        user.techno.map((techno) => (
          <span
            key={techno.id}
            className="inline-flex items-center gap-1 px-3 py-2 dark:text-black mb-3 rounded-3xl transition bg-slate-300 hover:op mr-3"
          >
            {' '}
            <img
              src={techno.image}
              alt="nextjs"
              className="w-9 h-9 p-1 bg-white2 rounded-lg "
            />{' '}
            <p>{techno.name}</p>
          </span>
        ))
      ) : (
        <p className="text-sm">Aucune technologie</p>
      )}

      <p className="mt-10 break-words whitespace-pre-wrap">
        {user.description || `${user.pseudo} n'a pas encore de description ...`}
      </p>
    </div>
  );
}
export default UserDetails;
