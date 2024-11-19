import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import ImageEdit from '../../components/private/edit-profile/image-edit';
import { useSettingsStore } from '../../store';
import { ProfileType } from '../../types';

function MyProfile() {
  const [profileData, setProfileData] = useState<ProfileType>();
  const { setGlobalErrorMessage } = useSettingsStore();

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
    <div className="flex w-full h-full md:flex-row flex-col overflow-y-scroll ">
      <div className="md:w-64 flex-shrink-0 flex-grow w-full overflow-y-scroll  flex flex-col justify-between md:pr-7 ">
        <div className=" flex mx-auto flex-col  md:pt-0 pt-4 items-center justify-start gap-4 md:flex-col xss:flex-row ">
          <ImageEdit image={profileData?.image} changeImage={setProfileData} />

          <h2 className="text-lg xss:w-52 w-80  break-all flex-wrap font-semibold  text-center">
            mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
          </h2>
          <h3 className="italic xss:w-52 w-80 text-base  break-words  text-center">
            Développeur Front-end
          </h3>
        </div>
        <div className=" hidden dark:text-darkTheme  md:flex flex-col items-center justify-end gap-5 border-slate-300">
          <p className="text-sm text-center dark:text-white2 text-slate-500">
            Connecté avec : peter22510@gmail.com
          </p>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-orange-300 hover:bg-orange-400 transition  "
          >
            Modifier mon profil
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-amber-200 hover:bg-amber-300 transition  "
          >
            Modifier mon mot de passe
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-red-400 hover:bg-red-500 transition  "
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
      <div className="md:px-8 px-2 flex-grow pt-6 md:pt-2  md:border-l-4 border-slate-300 md:overflow-scroll ">
        <div className="mt-4 p-2 md:py-4  py-3 w-full  dark:border-white2  mx-auto mb-10   rounded-3xl border-2 bg-white2 dark:bg-slate-200 flex flex-row items-center flex-wrap gap-3">
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
          <span className="inline-flex items-center dark:text-darkTheme gap-1 p-2 rounded-3xl transition bg-slate-200 dark:bg-white2  mr-2">
            {' '}
            <img
              src="https://i.postimg.cc/T1st76ps/4691205-redux-icon.png"
              alt="redux"
              className="w-7 h-7 p-1  bg-white2 rounded-lg "
            />{' '}
            <p>redux</p>
          </span>
        </div>

        <p className="  mb-8 pt-10 md:mb-0">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
          accusamus, rerum mollitia labore perspiciatis nobis officia molestias
          ipsum, recusandae ab ex praesentium aliquid consequuntur cumque
          deleniti suscipit, aspernatur magni voluptatibus. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Accusamus hic ab quaerat
          facilis, labore esse blanditiis nobis magni nihil doloremque deleniti
          iste quidem provident, tempora debitis quae sit explicabo libero!
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
          asperiores numquam ea culpa illum accusantium eos officiis, velit et
          vel incidunt, suscipit placeat earum aperiam quod, saepe tempora
          obcaecati quis. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Doloremque sequi eligendi placeat deleniti numquam, animi vel ex
          excepturi et quasi itaque voluptatibus ullam illum molestiae rerum
          ipsa eaque dolores nihil. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Exercitationem fugiat ratione, praesentium provident
          illo quibusdam facere rem explicabo velit reiciendis eveniet
          voluptates laboriosam nobis quidem voluptatum ea accusantium,
          reprehenderit eligendi! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Voluptates non at rerum voluptatum, voluptatibus
          neque illum deleniti voluptate esse nihil distinctio, sequi
          consectetur magnam! Sequi perspiciatis consequuntur dignissimos magnam
          laboriosam? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tempore, modi dolorem vel delectus quaerat sit illo perferendis labore
          ratione ad! Reprehenderit ea corrupti rerum eius fuga atque nulla odit
          eos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          accusamus ratione distinctio est quaerat corrupti velit aspernatur
          obcaecati dolores aliquid deserunt perferendis, accusantium ad. Optio
          aspernatur deleniti incidunt minima sequi. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ullam doloremque provident distinctio
          qui numquam laborum veniam cum corrupti mollitia omnis in temporibus
          inventore, exercitationem, iste consequatur, sit voluptatem similique
          repellat.
        </p>
        <div className=" pt-8 pb-6 md:hidden dark:text-darkTheme border-t-2 flex flex-col items-center justify-center gap-5 border-slate-300">
          <p className="text-sm text-center dark:text-white2 text-slate-500">
            Connecté avec : peter22510@gmail.com
          </p>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-amber-200 hover:bg-amber-300 transition  "
          >
            Modifier son mot de passe
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-red-400 hover:bg-red-500 transition  "
          >
            Supprimer son compte
          </button>
        </div>
      </div>
    </div>
  );
}
export default MyProfile;
