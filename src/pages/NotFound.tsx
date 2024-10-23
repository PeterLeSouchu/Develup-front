function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-9xl font-montserrat text-gray-600">404</h1>
        <p className="text-lg font-montserrat text-gray-600 mt-2">
          Oops, il ne semble pas y avoir de projets ici ...
        </p>

        <a
          href="/"
          className="bg-green mt-10 inline-block px-6 py-3 hover:bg-newgreen  text-darkgold font-semibold rounded-full shadow-md  transition duration-300 hover:scale-110"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  );
}

export default NotFound;
