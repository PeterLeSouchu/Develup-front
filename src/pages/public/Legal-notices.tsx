import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function LegalNotices() {
  useEffect(() => {
    window.scrollTo(0, 0);
    async function lol() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/csrf-token`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    }
    lol();
  }, []);

  return (
    <div className="max-w-3xl px-10 min-h-80 flex justify-center items-center  py-14 m-auto">
      <div className="flex flex-col gap-6 justify-center">
        <h1 className="text-4xl font-semibold  text-darkgold ">
          Mentions légales
        </h1>
        <div className="flex flex-col md:items-end gap-1 md:flex-row">
          <h2 className="font-semibold text-lg">Éditeur de l’application :</h2>
          <p>Équipe Develup</p>
        </div>
        <div className="flex flex-col md:items-end gap-1 md:flex-row">
          <h2 className="font-semibold text-lg">Hébergement :</h2>
          <p>
            Heroku -{' '}
            <Link to="https://www.heroku.com/">https://www.heroku.com/</Link>
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-semibold text-lg">
            Description de l’application :
          </h2>
          <p>
            Develup est présenté comme un prototype expérimental, conçu pour par
            un développeur dans le but d&apos; enrichir son portfolio. Cette
            plateforme permet la collaboration entre développeurs sur des
            projets web, mais n’est pas destinée à être utilisée comme une
            véritable application. Elle est mise à disposition gratuitement, à
            titre de démonstration.
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-semibold text-lg">Responsabilité :</h2>
          <p>
            L’éditeur de l’application ne saurait être tenu responsable des
            erreurs, interruptions de service ou pertes de données pouvant
            survenir lors de l’utilisation de Develup, en raison de son
            caractère expérimental. L&apos;utilisation de l&apos;application se
            fait sous la seule responsabilité de l&apos;utilisateur.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LegalNotices;
