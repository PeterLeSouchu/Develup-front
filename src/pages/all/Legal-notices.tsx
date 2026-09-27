import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../../components/all/Legal-page';

function LegalNotices() {
  return (
    <LegalPage title="Mentions légales" intro="Qui édite et héberge Develup.">
      <LegalSection title="Éditeur de l’application">
        <p>Équipe Develup</p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>develup33@gmail.com</p>
      </LegalSection>
      <LegalSection title="Hébergement">
        <p>
          Heroku -{' '}
          <Link to="https://www.heroku.com/" className="dv-link">
            https://www.heroku.com/
          </Link>
        </p>
      </LegalSection>
      <LegalSection title="Description de l’application">
        <p>
          Develup est présenté comme un prototype expérimental, conçu pour par
          un développeur dans le but d&apos; enrichir son portfolio. Cette
          plateforme permet la collaboration entre développeurs sur des projets
          web, mais n’est pas destinée à être utilisée comme une véritable
          application. Elle est mise à disposition gratuitement, à titre de
          démonstration.
        </p>
      </LegalSection>
      <LegalSection title="Responsabilité">
        <p>
          L’éditeur de l’application ne saurait être tenu responsable des
          erreurs, interruptions de service ou pertes de données pouvant
          survenir lors de l’utilisation de Develup, en raison de son caractère
          expérimental. L&apos;utilisation de l&apos;application se fait sous la
          seule responsabilité de l&apos;utilisateur.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default LegalNotices;
