import axios from 'axios';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { useSettingsStore } from '../../store';
import { UserType } from '../../types';
import defautUserImage from '../../assets/images/default-user-image.png';

// eslint-disable-next-line react-refresh/only-export-components
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
    <div>
      <section className="dv-surface flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
        <img
          className="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-pollen"
          src={user.image || defautUserImage}
          alt={user.pseudo}
        />
        <div className="min-w-0">
          <h1 className="break-words font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            {user.pseudo}
          </h1>
          <p className="dv-muted mt-1 text-lg">{user.type}</p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="dv-surface p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">À propos</h2>
          <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed">
            {user.description ||
              `${user.pseudo} n'a pas encore de description ...`}
          </p>
        </section>
        <section className="dv-surface self-start p-6">
          <h2 className="font-display text-lg font-bold">Technologies</h2>
          {user.techno.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {user.techno.map((techno) => (
                <li key={techno.id} className="dv-chip">
                  <img src={techno.image} alt="" className="dv-chip-logo" />
                  {techno.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dv-muted mt-3 text-sm">Aucune technologie</p>
          )}
        </section>
      </div>
    </div>
  );
}
export default UserDetails;
