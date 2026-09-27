import LegalPage, { LegalSection } from '../../components/all/Legal-page';

function Conditions() {
  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      intro="Les règles d'utilisation de Develup, en quelques points."
    >
      <LegalSection title="1. Définition de l'application">
        <p>
          Develup est une application prototype développée pour démontrer les
          compétences de son auteur en développement web et ainsi enrichir son
          portfolio. Elle est gratuite, à usage expérimental, et destinée
          uniquement à des fins de démonstration.
        </p>
      </LegalSection>
      <LegalSection title="2. Inscription et création de compte">
        <p>
          Pour accéder aux fonctionnalités de publication de contenus (texte et
          images) et de communication entre développeurs, les utilisateurs
          doivent créer un compte. Les informations fournies doivent être
          exactes et ne pas porter atteinte aux droits de tiers.
        </p>
      </LegalSection>
      <LegalSection title="3. Communication entre développeurs">
        <p>
          Develup permet aux développeurs de collaborer et de communiquer en
          temps réel sur des projets web. Les utilisateurs sont tenus de
          respecter les règles de courtoisie et de ne pas diffuser de contenu
          offensant, illégal ou inapproprié dans la messagerie de la plateforme.
        </p>
      </LegalSection>
      <LegalSection title="4. Utilisation des contenus">
        <p>
          Les utilisateurs peuvent publier du contenu (texte et images) sur
          Develup. Ils s’engagent à ne publier aucun contenu illégal, offensant
          ou portant atteinte aux droits d’autrui. L&apos;auteur de
          l&apos;application se réserve le droit de supprimer tout contenu jugé
          inapproprié sans préavis.
        </p>
      </LegalSection>
      <LegalSection title="5. Limitation de responsabilité">
        <p>
          Develup étant une application expérimentale, aucune garantie n’est
          donnée quant à sa stabilité, sa sécurité ou sa disponibilité.
          L&apos;application est fortement sécurisée, néanmoins aucune
          application au monde n&apos;est à l&apos;abri d&apos;une faille
          informatique, de ce fait l&apos;auteur de l&apos;application décline
          toute responsabilité en cas de pertes de données, d’indisponibilité ou
          de dommages directs ou indirects liés à l’utilisation de
          l’application.
        </p>
      </LegalSection>
      <LegalSection title="6. Protection des données">
        <p>
          Les données personnelles collectées sont limitées aux informations
          nécessaires pour la création de comptes. Elles ne sont utilisées
          qu&apos;à cette fin et ne sont ni revendues ni exploitées à des fins
          commerciales.
        </p>
      </LegalSection>
      <LegalSection title="7. Cookies">
        <p>
          Develup utilise des cookies, qui sont obligatoires pour accéder aux
          fonctionnalités réservées aux utilisateurs connectés. Ces cookies sont
          de petits fichiers stockés sur votre appareil lors de votre visite sur
          l&apos;application. Ils permettent de mémoriser vos préférences, de
          vous authentifier et d&apos;analyser l&apos;utilisation de
          l&apos;application. Vous pouvez gérer vos préférences en matière de
          cookies dans les paramètres de votre navigateur, mais sachez que
          désactiver les cookies peut limiter votre accès aux fonctionnalités de
          Develup.
        </p>
      </LegalSection>
      <LegalSection title="8. Modification des CGU">
        <p>
          Ces CGU sont susceptibles d’être modifiées sans préavis. Les
          utilisateurs seront informés de tout changement important via
          l’interface de l’application.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default Conditions;
