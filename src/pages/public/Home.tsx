import { FaArrowTrendUp, FaJava, FaPython } from 'react-icons/fa6';
import { MdLaptopMac } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import { SiPhp } from 'react-icons/si';
import { LuMessagesSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo.png';

function Home() {
  return (
    <>
      <section className=" min-h-80 flex flex-col items-center justify-evenly my-12 ">
        <img
          src={image}
          alt="Logo-entier-Develup"
          className=" w-1/2 min-w-96 max-w-2xl  "
        />
        <section className="flex flex-col justify-center items-center text-3xl lg:text-4xl  text-center font-semibold text-gray-800">
          <p className="font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D7C392] to-[#B79178] drop-shadow-sm ">
            Développez ensemble
          </p>
          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D7C392] to-[#B79178] drop-shadow-sm ">
            Progressez ensemble
          </p>
        </section>

        <Link
          to="/signup"
          className="link-comet p-3 rounded-lg bg-gold text-black my-10 transition shadow-xl"
        >
          Rejoindre la communauté
        </Link>
      </section>
      <section className="flex flex-col items-center justify-evenly text-center min-h-100 pb-20">
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="md:text-xl w-3/4 mx-auto  bg-slate-200 rounded-xl p-6 shadow-md drop-shadow-xl">
            Develup est une plateforme innovante qui a pour objectif de faire
            collaborer des développeurs sur des projets web. Que vous cherchiez
            à rejoindre un groupe dynamique ou que vous souhaitiez trouver des
            développeurs passionnés pour concrétiser votre propre projet,
            Develup est là pour vous !
          </p>
          <p className="md:text-xl w-3/4 mx-auto  bg-slate-200 rounded-xl p-6 shadow-md drop-shadow-xl">
            Grâce à notre interface conviviale, vous pouvez explorer une
            multitude de projets en cours, vous connecter avec des développeurs
            aux compétences variées et échanger des idées en temps réel. Develup
            favorise un environnement collaboratif où chacun peut contribuer et
            apprendre. Avec le soutien d&apos;une communauté active, vous êtes
            assuré de trouver des partenaires qui partagent vos ambitions et
            votre passion pour le développement.
          </p>
          <p className="md:text-xl w-3/4 mx-auto  bg-slate-200 rounded-xl p-6 shadow-md drop-shadow-xl">
            Rejoignez Develup et transformez vos visions en réalité avec le
            soutien d&apos;autres passionnés du développement web !
          </p>
        </div>
        <p className="text-6xl  m-20  text-transparent bg-clip-text bg-gradient-to-r from-[#D7C392] to-[#B79178] drop-shadow-sm ">
          EN BREF
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-screen flex-wrap">
          <div className="bg-diagonal-gradient w-25 h-72 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl">
            <p className="text-2xl font-semibold">
              Collaborez sur des projets web qui vous donne envie
            </p>
            <span className="text-8xl">
              <LuMessagesSquare />
            </span>
          </div>
          <div className="bg-diagonal-gradient w-25 h-72 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl">
            <p className="text-2xl font-semibold">
              Travaillez ensemble, à votre rythme et selon vos technologies
            </p>
            <div className="flex justify-evenly items-center">
              <div className="flex flex-col md:flex-row justify-center items-center mr-5">
                <FaJava className="text-3xl m-2" />
                <FaReact className="text-3xl m-2" />
              </div>
              <span className="text-8xl">
                <MdLaptopMac />
              </span>
              <div className="flex flex-col md:flex-row justify-center items-center ml-5">
                <SiPhp className="text-3xl m-2" />
                <FaPython className="text-3xl m-2" />
              </div>
            </div>
          </div>
          <div className="bg-diagonal-gradient w-25 h-72 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl ">
            <p className="text-2xl font-semibold">
              Progressez, gagnez en expérience et enrichissez votre portfolio
            </p>
            <span className="text-8xl">
              <FaArrowTrendUp />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
