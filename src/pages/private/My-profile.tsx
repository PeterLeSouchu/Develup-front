import defaultImage from '../../assets/images/default-project-image.jpg';

function MyProfile() {
  return (
    <div className="flex w-full h-full ">
      <div className="w-1/4 ">
        <div className="h-4/5 flex flex-col items-center">
          <img
            src={defaultImage}
            alt="lol"
            className="rounded-full xl:w-56 xl:h-56 md:w-48 md:h-48  w-28 h-28 object-cover mb-9"
          />
          <h2 className="md:mb-9 mb-4 md:text-2xl text-xl text-center">
            Pseudo de l&apos;utilisateur
          </h2>
          <h3 className="italic md:mb-9 mb-4 text-center">
            Développeur Front-end
          </h3>
          <p className="text-sm text-center text-slate-500">
            Connecté avec : peter22510@gmail.com
          </p>
        </div>
        <div className="h-1/5 border-t-2 border-slate-300">
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-amber-200 hover:bg-amber-300 transition mt-4 xl:text-base text-sm"
          >
            Modifier son mot de passe
          </button>
          <button
            type="button"
            className="p-2 w-full rounded-lg bg-red-400 hover:bg-red-500 transition xl:text-base text-sm mt-4"
          >
            Supprimer son compte
          </button>
        </div>
      </div>
      <div className="w-3/4 pl-2 ml-2 border-l-2 border-slate-300 ">div2</div>
    </div>
  );
}
export default MyProfile;
