import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../store';
import { ProfileType } from '../../types';
import EditProfileModal from '../../components/private/modals/Edit-profile-modal';
import defaultUserImage from '../../assets/images/default-user-image.png';
import DeleteAccountModal from '../../components/private/modals/Delete-account-modal';
import EditPasswordModal from '../../components/private/modals/Edit-password-modal';

function MyProfile() {
  const [profileData, setProfileData] = useState<ProfileType>();
  const { setGlobalErrorMessage } = useSettingsStore();
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [deleAccountModal, setDeleAccountModal] = useState<boolean>(false);
  const [editPasswordModal, setEditPasswordModal] = useState<boolean>(false);

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
    async function getPersonalDataProfile() {
      try {
        const { data } = await axiosWithCSRFtoken.get('/personal-profile');
        return setProfileData(data.result);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message;
          setGlobalErrorMessage(message);
          return 'erreur inattendu';
        }
        setGlobalErrorMessage('Erreur innatendu, essayez de vous reconnecter');
        return 'erreur inattendu';
      }
    }
    getPersonalDataProfile();
  }, [setGlobalErrorMessage]);

  return (
    <div className="flex w-full h-full md:flex-row flex-col overflow-y-scroll md:dark:text-black ">
      <div className="md:w-64 flex-shrink-0  w-full overflow-y-scroll  flex flex-col justify-between  ">
        <div className=" flex mx-auto flex-col w-full   md:pt-0 pt-4 items-center justify-start gap-4 md:flex-col xss:flex-row md:bg-white2 md:dark:bg-slate-200 md:rounded-xl md:p-4 ">
          <img
            src={profileData?.image || defaultUserImage}
            alt="lol"
            className="rounded-full md:mt-3   w-36 h-36 object-cover "
          />

          <Link to={`/dashboard/user/${profileData?.slug}`}>
            <h2 className="text-lg xss:w-52 w-80  break-all hover:text-gold transition dark:hover:text-darkgold flex-wrap font-semibold  text-center">
              {profileData?.pseudo}
            </h2>
          </Link>
          <h3 className="italic xss:w-52 w-80 text-base  break-words  text-center">
            {profileData?.type}
          </h3>
        </div>
        <div className=" hidden  mt-4 md:flex flex-col items-center justify-end gap-5 border-slate-300 md:bg-white2 md:dark:bg-slate-200 md:rounded-xl p-4 ">
          <p className="text-sm text-center  text-slate-500">
            Connecté avec : {profileData?.email}
          </p>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-orange-300 hover:bg-orange-400 transition  "
            onClick={handleEditProfile}
          >
            Modifier mon profil
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-amber-200 hover:bg-amber-300 transition  "
            onClick={handleEditPassword}
          >
            Modifier mon mot de passe
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-red-400 hover:bg-red-500 transition  "
            onClick={handleDeleteAccount}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
      <div className="md:px-8 px-2 flex-grow pt-6 md:pt-0   md:overflow-scroll  ">
        <div className="md:bg-white2  md:dark:bg-slate-200 md:rounded-xl p-4 mb-6">
          <h2 className="text-xl">Technologies : </h2>
          <div className="mt-4 p-2 md:py-4  py-3 w-full  dark:border-white2 md:border-none  mx-auto    rounded-3xl border-2 bg-white2 dark:bg-slate-200 flex flex-row items-center flex-wrap gap-3">
            {profileData?.techno && profileData.techno.length > 0 ? (
              profileData.techno.map((techno) => (
                <span
                  key={techno.name}
                  className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2"
                >
                  <img
                    src={techno.image}
                    alt={techno.name}
                    className="w-7 h-7 p-1 bg-white2 rounded-lg"
                  />
                  <p>{techno.name}</p>
                </span>
              ))
            ) : (
              <p className="dark:text-black">
                Vous n&apos;avez pas encore de technologie associée
              </p>
            )}
          </div>
        </div>
        <div className="md:bg-white2 md:dark:bg-slate-200 md:rounded-xl p-4">
          <h2 className="text-xl">Description :</h2>
          <p className="  mb-8 mt-6 md:mb-0 break-words whitespace-pre-wrap">
            {profileData?.description ||
              "Vous n'avez pas encore de description ..."}
          </p>
        </div>
        <div className=" pt-8 pb-6 md:hidden dark:text-darkTheme border-t-2 flex flex-col items-center justify-center gap-5 border-slate-300 ">
          <p className="text-sm text-center dark:text-white2 text-slate-500 ">
            Connecté avec : peter22510@gmail.com
          </p>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-orange-300 hover:bg-orange-400 transition  "
            onClick={handleEditProfile}
          >
            Modifier mon profil
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-amber-200 hover:bg-amber-300 transition  "
            onClick={handleEditPassword}
          >
            Modifier son mot de passe
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-red-400 hover:bg-red-500 transition  "
            onClick={handleDeleteAccount}
          >
            Supprimer son compte
          </button>
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
