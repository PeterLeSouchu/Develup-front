# 🌟 Projet Develup

**Develup est une application web réalisée dans le cadre de mon portfolio, qui permet de faire collaborer des développeurs sur des projets web. Les utilisateur pourront poster des projets, rechercher des projets selon des technologies et un rythme de travail, et communiquer en temps réel.**

**Ce repo contient le code front-end de Develup et est dédié à la partie technique de ses fonctionnalités, si vous souhaitez voir la partie technique back-end [cliquez-ici](https://github.com/PeterLeSouchu/Develup-back)**

**Si vous souhaitez en savoir plus sur le projet, connaitre les fonctionnalités générales, voir à quoi il ressemble ou bien le tester [cliquez-ici](https://github.com/PeterLeSouchu/Develup-front)**

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
- Prémunition des attaques XSS avec React

### ❌ 4. Gestion d'erreur

- Dans les requêtes API, utilisation d'un try/catch, qui, en cas d'erreur vient regarder si l'erreur vient de la session afin de passer le state error du store à true et ainsi afficher le composant message avec le message d 'erreur pour inciter l'utilisateur à se re-connecter. Sinon le message d'erreur est passé à un state local d'un composant et ce dernier s'il est true affiche un composant BackError avec le message d'erreur provenant du back.
- Pour les erreurs provenant du front, donc des erreurs de validation de schéma de formulaire avec ZOD, on utilise React Hook Form qui en complément d'un schéma ZOD déclenche automatiquement l'erreur, erreur que l'on passe en props d'un composant erreur front pour afficher le message d'erreur.

### ⬇️ 5. Points à ajouter ou améliorer

- Se prémunir des attaques par force brute avec un captcha pour la connnexion
- Mettre en place une FAQ sur la page d'accueil pour expliquer plus en détail l'application
- Factoriser le code pour diminuer le nombre de composants nécessaire
- Trouver un moyen de faire une fonction permettant de faire une requete api avec axios et un try catch inclu, afin de ne pas se répeter dans le code, et permettre une meilleure lisibilité
- Améliorer le style et le rendre plus moderne

#### 🚨 Avertissement

L'application utilise des loaders en majorité à la place des useEfect, ce qui fait qu'en production à cause la la base de données gratuite et peu performante, les données mettent du temps à arriver, et sachant que le loader a pour but de récupérer toutes les données avant d'afficher la page, cela peut causer une légère latence.
