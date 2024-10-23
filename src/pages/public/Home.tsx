import { useEffect, useRef, useState } from 'react';
import { FaArrowTrendUp, FaJava, FaPython } from 'react-icons/fa6';
import { MdLaptopMac } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import { SiPhp } from 'react-icons/si';
import { LuMessagesSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo.png';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Deconnect once section is visible
        }
      },
      { threshold: 0.1 } // Start observation when 70% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="h-92 flex flex-col items-center justify-evenly ">
        <img
          src={image}
          alt="Logo-entier-Develup"
          className=" w-1/2 min-w-96 max-w-4xl "
        />
        <section className="flex flex-col justify-center items-center text-2xl lg:text-5xl md:text-3xl  ">
          <p className="mb-3">Développez ensemble,</p>
          <p>Progressez ensemble</p>
        </section>
        <div className="flex justify-center">
          <Link
            to="/signup"
            className=" p-3 rounded-lg bg-gold text-black hover:bg-darkgold hover:scale-105 hover:text-white transition shadow-xl"
          >
            Rejoindre la communauté
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-center justify-evenly text-center min-h-100 mb-28">
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="md:text-xl w-3/4 mx-auto backdrop-blur-mini bg-slate-100 rounded-xl p-6 shadow-md">
            Develup est une plateforme innovante qui a pour objectif de faire
            collaborer des développeurs sur des projets web. Que vous cherchiez
            à rejoindre un groupe dynamique ou que vous souhaitiez trouver des
            développeurs passionnés pour concrétiser votre propre projet,
            Develup est là pour vous !
          </p>
          <p className="md:text-xl w-3/4 mx-auto backdrop-blur-mini bg-slate-100 rounded-xl p-6 shadow-md">
            Grâce à notre interface conviviale, vous pouvez explorer une
            multitude de projets en cours, vous connecter avec des développeurs
            aux compétences variées et échanger des idées en temps réel. Develup
            favorise un environnement collaboratif où chacun peut contribuer et
            apprendre. Avec le soutien d&apos;une communauté active, vous êtes
            assuré de trouver des partenaires qui partagent vos ambitions et
            votre passion pour le développement.
          </p>
          <p className="md:text-xl w-3/4 mx-auto backdrop-blur-mini bg-slate-100 rounded-xl p-6 shadow-md">
            Rejoignez Develup et transformez vos visions en réalité avec le
            soutien d&apos;autres passionnés du développement web !
          </p>
        </div>
        <p className="text-7xl backdrop-blur-mini m-20 text-darkgold">
          En bref
        </p>
        <div
          ref={sectionRef}
          className="flex flex-col md:flex-row items-center justify-center gap-10 w-screen flex-wrap"
        >
          <div
            className={`bg-diagonal-gradient w-25 h-80 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl border transition-opacity duration-1000 ease-in-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-2xl font-semibold">
              Collaborez sur des projets web qui vous donne envie
            </p>
            <span className="text-8xl">
              <LuMessagesSquare />
            </span>
          </div>
          <div
            className={`bg-diagonal-gradient w-25 h-80 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl border transition-opacity duration-1000 ease-in-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
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
          <div
            className={`bg-diagonal-gradient w-25 h-80 min-w-80 rounded-3xl flex flex-col justify-center items-center gap-6 p-5 shadow-xl border transition-opacity duration-1000 ease-in-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-2xl font-semibold">
              Progressez, gagnez en expérience et améliorer votre portfolio
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
