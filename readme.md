# 🌟 [Projet Develup](https://develup.up.railway.app)

**Develup est une application web réalisée dans le cadre de mon portfolio, qui permet de faire collaborer des développeurs, ou toute personne intéressée par le monde du dev, sur des projets web. Les utilisateurs pourront poster des projets, rechercher des projets selon des technologies et un rythme de travail, et communiquer en temps réel. L’objectif de Develup est de vous aider à progresser, et quoi de mieux que de le faire en équipe.**

## ⭐ Fonctionnalitées de l'application :

- Créer un compte utilisateur
- Se connecter
- Demander à réinitialiser son mot de passe (mot de passe oublié)
- Rechercher un projet selon ses technologies et son rythme de travail
- Accéder à la page détail d'un projet
- Accéder à la page détail d'un utilisateur
- Ajouter / Supprimer / modifier un projet
- Modifier son profil
- Modifier son mot de passe
- Supprimer son compte
- Communiquer en temps réel avec un utilisateur
- Changer de thème (clair / sombre)

**Ce repo contient le code front-end de Develup et est dédié à la partie technique de ses fonctionnalités, si vous souhaitez voir la partie technique back-end [cliquez-ici](https://github.com/PeterLeSouchu/Develup-back)**

## 🛠️ Fonctionnement du front-end :

### ⚙️ 1. Architecture

- Single Page Application avec Vite, React et TypeScript.
- Tailwind CSS pour le style avec des classes CSS personnalisées.
- Utilisation d'ESLint AirBnb.

### 📦 2. Store

- Mise en place d'un store Zustand.
- 1 state "logged" pour savoir si l'utilisateur est connecté.
- 1 state "darkTheme" qui permet de définir le thème de l'application (avec Tailwind).
- 1 state "loading" qui permet d'afficher le composant loader quand une requête prend du temps.
- 1 state "globalErrorMessage" qui permet d'afficher une erreur générale (pas les petites erreurs de validation de formulaire).

### 🔒 3. Sécurité

- Mise en place d'une route protégée, englobant toutes celle nécessitant une authentification et qui utilise le state "logged" du store afin d'afficher un layout privé, ou de redirigé vers le layout public selon le state "logged".
- Utilisation de ZOD avec React Hook Form pour valider les données avant de les envoyer au back.
- Prémunition des attaques XSS avec React.

### ❌ 4. Gestion d'erreur

- Dans les requêtes API, utilisation d'un try/catch, qui, en cas d'erreur vient regarder si l'erreur vient de la session afin de passer le state error du store à true et ainsi afficher le composant message avec le message d 'erreur pour inciter l'utilisateur à se re-connecter. Sinon le message d'erreur est passé à un state local d'un composant et ce dernier, s'il est true, affiche un composant erreur avec le message d'erreur provenant du back.
- Pour les erreurs provenant du front, donc des erreurs de validation de schéma de formulaire avec ZOD, on utilise React Hook Form qui, en complément d'un schéma ZOD déclenche automatiquement l'erreur, erreur que l'on passe en props d'un composant erreur front pour afficher le message d'erreur.


### ⏳ 5. Gestion du chargement (requêtes API)
- Utilisation d'un composant parent wrapper sur certains composants, qui permet d'afficher un spinner/loader pendant une requête asynchrone en fonction de l'état "loading" du store.
- Utilisation du hook "useNavigation" de react-router afin d'afficher le spinner/loader en fonction du state du hook. Lorsqu'un utilisateur change de page, les données de la page sont fetchées grâce à un loader, ce qui permet de récupéerer toutes les données du back avant d'afficher ces dernières et c'est là qu'intervient ce hook qui me permet de regarder si le state === 'loading', et si c'est le cas d'afficher le spinner/loader. 

### 💻 6. Technologies utilisées

- React avec TypeScript
- [Axios](https://www.npmjs.com/package/axios) pour les requêtes API
- [React Hook Form](https://www.npmjs.com/package/react-hook-form) pour la gestion des formulaires
- [React icon](https://react-icons.github.io/react-icons/) pour les icones
- [ZOD](https://www.npmjs.com/package/zod) Pour valider les données de formulaire
- [Zustand](https://www.npmjs.com/package/zustand) pour gérer les states partagés dans mon app
- [socket.io-client](https://socket.io/docs/v4/client-initialization/) pour la communication en temps réel.

### ⬇️ 7. Points à ajouter ou améliorer

- Se prémunir des attaques par force brute avec un captcha pour la connnexion.
- Mettre en place une pagination sur la page d'accueil pour gagner en rapidité et ainsi améliorer l'expérience utilisateur.
- Mettre en place des notifications en cas d'ajout / modification / suppression de projet ou de profil.
-  Mettre en place une "pillule rouge" afin de voir quand on a un nouveau message.
- Mettre en place une FAQ sur la page d'accueil pour expliquer plus en détail l'application.
- Factoriser le code pour diminuer le nombre de composants nécessaires.
- Trouver un moyen de faire une fonction permettant de faire une requete api avec axios et un try catch inclu, afin de ne pas se répeter dans le code, et permettre une meilleure lisibilité.
- Améliorer le style et le rendre plus moderne.
-  Améliorer l'accessibilité, surtout au niveau des formulaires.
