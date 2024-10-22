import image from '../assets/images/Peter_LE_SOUCHU_1_-removebg.jpg';

function Home() {
  return (
    <div>
      <img
        src={image}
        alt="Logo-entier-Develup"
        className="m-auto w-1/2 min-w-72 pt-20"
      />
      <section className="flex flex-col justify-center items-center text-2xl lg:text-5xl md:text-3xl mt-6 mb-16 ">
        <p className="mb-3">Développez ensemble,</p>
        <p>Progressez ensemble,</p>
      </section>
      <div className="flex justify-center">
        <a
          href="/signup"
          className=" p-3  rounded-lg bg-darkgold text-white hover:bg-gold hover:scale-105 hover:text-black transition"
        >
          Rejoindre la communauté
        </a>
      </div>
    </div>
  );
}
export default Home;
