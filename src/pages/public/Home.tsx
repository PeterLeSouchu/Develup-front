import { FaArrowTrendUp, FaJava, FaPython } from 'react-icons/fa6';
import { MdLaptopMac } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import { SiPhp } from 'react-icons/si';
import { LuMessagesSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo.png';
import homeImage from '../../assets/images/home-image.png';
import conversationImage from '../../assets/images/conversation-image.png';
import conversationMobileImage from '../../assets/images/conversationMobile-image.png';
import homeMobileImage from '../../assets/images/homeMobile-image.png';

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
          className="link-comet p-3 rounded-lg bg-gold text-black my-10 transition shadow-xl "
        >
          Rejoindre la communauté
        </Link>
      </section>
      <section className="flex flex-col items-center justify-evenly text-center min-h-100 pb-20">
        <div className="flex flex-col items-center justify-center gap-10 mt-20 mb-24 ">
          <article className=" flex flex-col sm:gap-10 gap-5 items-center">
            <p
              className="sm:text-base text-sm
             w-2/3 mx-auto  bg-slate-200 rounded-3xl p-6 shadow-md drop-shadow-md border-r-2 border-slate-300 "
            >
              Develup est une plateforme novatrice conçue pour connecter des
              développeurs et faciliter la réalisation de projets web. Grâce à
              notre interface intuitive, explorez une variété de projets en
              cours. Que vous aspiriez à rejoindre une équipe motivée ou à
              rassembler des développeurs passionnés pour concrétiser votre
              projet, Develup est votre allié idéal !
            </p>
            <img
              src={homeImage}
              alt="homePage screenshot"
              className="w-3/4 p-1 sm:block hidden bg-shadowGold rounded-xl shadow-2xl drop-shadow-2xl"
            />
            <img
              src={homeMobileImage}
              alt="homePage screenshot"
              className="w-3/5 p-1 sm:hidden block bg-shadowGold rounded-xl shadow-2xl drop-shadow-2xl"
            />
          </article>
          <article className="flex flex-col sm:gap-10 gap-5 items-center mt-28 ">
            <p className="sm:text-base text-sm w-2/3 mx-auto  bg-slate-200 rounded-3xl p-6 shadow-md drop-shadow-md border-r-2 border-slate-300  ">
              Interagissez en temps réel avec des développeurs aux compétences
              variées et partagez vos idées instantanément. Develup crée un
              espace collaboratif dynamique où chacun peut échanger afin de
              contribuer à la réussite des projets. Soutenu par une communauté
              engagée, vous trouverez facilement des partenaires qui partagent
              votre passion et vos ambitions dans le domaine du développement.
            </p>
            <img
              src={conversationImage}
              alt="homePage screenshot"
              className=" w-3/4 p-1 sm:block hidden bg-shadowGold rounded-xl shadow-2xl drop-shadow-2xl"
            />
            <img
              src={conversationMobileImage}
              alt="homePage screenshot"
              className=" w-3/5 p-1 sm:hidden block bg-shadowGold  rounded-xl shadow-2xl drop-shadow-2xl"
            />
          </article>
        </div>
        <p className="text-6xl  m-20  text-transparent bg-clip-text bg-gradient-to-r from-[#D7C392] to-[#B79178] drop-shadow-sm ">
          EN BREF
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-screen flex-wrap">
          <div className="bg-diagonal-gradient border-2 w-25 h-72 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl">
            <p className="text-2xl font-semibold">
              Collaborez sur des projets web qui vous donnent envie
            </p>
            <span className="text-8xl">
              <LuMessagesSquare />
            </span>
          </div>
          <div className="bg-diagonal-gradient w-25 h-72 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl border-2 ">
            <p className="text-2xl font-semibold">
              Travaillez ensemble, à votre rythme et selon vos Technologies
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
          <div className="bg-diagonal-gradient border-2 w-25 h-72 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl ">
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
