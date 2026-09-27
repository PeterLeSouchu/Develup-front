import { Link, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { LuKeyRound, LuMail, LuPencil, LuTrash2 } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '../../store';
import { ProfileType } from '../../types';
import EditProfileModal from '../../components/private/modals/Edit-profile-modal';
import defaultUserImage from '../../assets/images/default-user-image.png';
import DeleteAccountModal from '../../components/private/modals/Delete-account-modal';
import EditPasswordModal from '../../components/private/modals/Edit-password-modal';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import PageHeader from '../../components/private/ui/Page-header';

// eslint-disable-next-line react-refresh/only-export-components
export const loadProfileData = async () => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithoutCSRFtoken.get('/personal-profile');
    return data.result;
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

function MyProfile() {
  const [profileData, setProfileData] = useState<ProfileType>();
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [deleAccountModal, setDeleAccountModal] = useState<boolean>(false);
  const [editPasswordModal, setEditPasswordModal] = useState<boolean>(false);
  const profileDataFromLoader = useLoaderData() as ProfileType;

  function handleEditProfile() {
    setEditProfileModal(true);
  }

  function handleDeleteAccount() {
    setDeleAccountModal(true);
  }

  function handleEditPassword() {
    setEditPasswordModal(true);
  }

  useEffect(() => {
    setProfileData(profileDataFromLoader);
  }, [profileDataFromLoader]);

  return (
    <div>
      <PageHeader
        title="Mon profil"
        subtitle="Ce que les autres membres voient de vous."
        action={null}
      />
      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <aside className="flex flex-col gap-6">
          <section className="dv-surface flex flex-col items-center p-6 text-center">
            <img
              src={profileData?.image || defaultUserImage}
              alt={profileData?.pseudo}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-pollen"
            />
            <Link
              to={`/dashboard/user/${profileData?.slug}`}
              className="mt-4 break-all font-display text-2xl font-bold underline-offset-4 hover:underline"
            >
              {profileData?.pseudo}
            </Link>
            <p className="dv-muted mt-1">{profileData?.type}</p>
            <p className="dv-muted mt-4 flex items-center gap-1.5 break-all text-xs">
              <LuMail aria-hidden className="shrink-0" />
              {profileData?.email}
            </p>
          </section>
          <section className="dv-surface flex flex-col gap-2 p-4">
            <button
              type="button"
              className="dv-btn-primary w-full"
              onClick={handleEditProfile}
            >
              <LuPencil aria-hidden />
              Modifier mon profil
            </button>
            <button
              type="button"
              className="dv-btn-outline w-full"
              onClick={handleEditPassword}
            >
              <LuKeyRound aria-hidden />
              Modifier mon mot de passe
            </button>
            <button
              type="button"
              className="dv-btn-danger-soft w-full"
              onClick={handleDeleteAccount}
            >
              <LuTrash2 aria-hidden />
              Supprimer mon compte
            </button>
          </section>
        </aside>
        <div className="flex flex-col gap-6">
          <section className="dv-surface p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold">Technologies</h2>
            {profileData?.techno && profileData.techno.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {profileData.techno.map((techno) => (
                  <li key={techno.name} className="dv-chip">
                    <img src={techno.image} alt="" className="dv-chip-logo" />
                    {techno.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dv-muted mt-3">
                Vous n&apos;avez pas encore de technologie associée
              </p>
            )}
          </section>
          <section className="dv-surface p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold">Description</h2>
            <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed">
              {profileData?.description ||
                "Vous n'avez pas encore de description ..."}
            </p>
          </section>
        </div>
      </div>
      {editProfileModal && (
        <EditProfileModal
          setResults={setProfileData}
          setModal={setEditProfileModal}
        />
      )}
      {deleAccountModal && (
        <DeleteAccountModal setModal={setDeleAccountModal} />
      )}
      {editPasswordModal && (
        <EditPasswordModal setModal={setEditPasswordModal} />
      )}
    </div>
  );
}
export default MyProfile;
