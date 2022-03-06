# 1. Pokefumi : Nx + Docker + Typescript + Express + Jwt + OpenAPI + Jest

Poke-fu-mi est une application qui permet d'organiser des combats entre maîtres Pokémon mais les règles ne sont pas exactement celles du jeu classique.

Pour le déroulement d'une partie, voilà ce qu'il se passe (en considérant que les joueurs ont déjà créé un compte et ont composé une liste de pokemon pour jouer) :

1. Un joueur crée un Salon.
2. Un second joueur peut rejoindre le salon par une invitation, sinon en accédant à un salon public sans invitation.
3. Le match est lancé, les 10 pokemon de chaque joueurs vont être confrontés dans une succession de rounds 2 à 2.
4. Chaque round consiste à comparer les types de chaque pokemon et à déclarer le vainqueur du round selon le nombre de points gagnés pour chaque type supérieur à l'adversaire.
5. Lorsque les 10 rounds ont été réalisés, le joueur vainqueur du match est celui qui aura accumulé le plus de points.
6. Le salon est clos. Pour lancer une nouvelle partie, le joueur revient à l'étape 1.

- [1. Pokefumi : Nx + Docker + Typescript + Express + Jwt + OpenAPI + Jest](#1-pokefumi--nx--docker--typescript--express--jwt--openapi--jest)
  - [1.1. Fonctionnalités](#11-fonctionnalités)
  - [1.2. Résumé du travail réalisé par rapport au spécifications fournies](#12-résumé-du-travail-réalisé-par-rapport-au-spécifications-fournies)
    - [1.2.1. Fonctionnalités](#121-fonctionnalités)
    - [1.2.2. Contraintes](#122-contraintes)
  - [1.3. Schéma d'architecture](#13-schéma-darchitecture)
  - [1.4. Description des différents services](#14-description-des-différents-services)
  - [1.5. Choix techniques](#15-choix-techniques)
    - [1.5.1. Généraux](#151-généraux)
      - [1.5.1.1. Approche "schéma-first" ?](#1511-approche-schéma-first-)
      - [1.5.1.2. Pourquoi s'embêter avec Nx ?](#1512-pourquoi-sembêter-avec-nx-)
      - [1.5.1.3. Prisma ?](#1513-prisma-)
      - [1.5.1.4. NPM Workspaces : pourquoi nous avons du les abandonner](#1514-npm-workspaces--pourquoi-nous-avons-du-les-abandonner)
      - [1.5.1.5. Déploiement continu avec Heroku ?](#1515-déploiement-continu-avec-heroku-)
    - [1.5.2. API Gateway](#152-api-gateway)
    - [1.5.3. User service](#153-user-service)
    - [1.5.4. Matchmaking service](#154-matchmaking-service)
    - [1.5.5. Round service](#155-round-service)
    - [1.5.6. Stats service](#156-stats-service)
  - [1.6. Documentation de référence et exemples de requêtes / réponses](#16-documentation-de-référence-et-exemples-de-requêtes--réponses)
  - [1.7. Pour bien commencer, pour tester les microservices](#17-pour-bien-commencer-pour-tester-les-microservices)
    - [1.7.1. Sans Docker et sans l'API Gateway ("boite blanche")](#171-sans-docker-et-sans-lapi-gateway-boite-blanche)
      - [1.7.1.1. Premier lancement](#1711-premier-lancement)
      - [1.7.1.2. Executer les tests d'intégration sans API Gateway avec Jest](#1712-executer-les-tests-dintégration-sans-api-gateway-avec-jest)
    - [1.7.2. Avec Docker, docker-compose et l'API Gateway ("boite noire")](#172-avec-docker-docker-compose-et-lapi-gateway-boite-noire)
      - [1.7.2.1. Lancement des micro-services](#1721-lancement-des-micro-services)
      - [1.7.2.2. Tests d'intégration au travers de l'API Gateway avec un script bash](#1722-tests-dintégration-au-travers-de-lapi-gateway-avec-un-script-bash)
  - [1.8. Liste des targets nx](#18-liste-des-targets-nx)
  - [1.9. Choix de conception](#19-choix-de-conception)
    - [1.9.1. API Stats](#191-api-stats)
    - [1.9.2. Distinction entre Matchmaking et Round](#192-distinction-entre-matchmaking-et-round)
    - [1.9.3. V1 (version implémentée)](#193-v1-version-implémentée)
    - [1.9.4. V2 (non implémenté)](#194-v2-non-implémenté)
  - [1.10. Evolutions possibles de l'application](#110-evolutions-possibles-de-lapplication)
    - [1.10.1. Système de salon](#1101-système-de-salon)
    - [1.10.2. Statistiques sur l'activité](#1102-statistiques-sur-lactivité)
    - [1.10.3. Meilleur gestion des erreurs](#1103-meilleur-gestion-des-erreurs)
    - [1.10.4. Bonus 💰 : comment ajouter un service de vente de Pokemon "rares" que l'on peut ajouter à son Docker ?](#1104-bonus---comment-ajouter-un-service-de-vente-de-pokemon-rares-que-lon-peut-ajouter-à-son-docker-)

## 1.1. Fonctionnalités

- Node.JS 16 + Typescript 4.6
- [Nx monorepo](https://nx.dev/) :
  - targets pour construire le projet, génération la documentation, construire les images docker, faire des tests, etc.
  - Webpack 5 pour un développement plus rapide
- Prettier + Eslint
- Approche "schéma-first" :
  - Clients axios rest générés à partir des schémas OpenAPI avec [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
  - Routeur et stubs générés à partir du schéma OpenAPI avec [oats-ts](https://github.com/oats-ts/oats-ts)
  - Base de données SQLite générée à partir d'un schéma avec l'ORM [Prisma](https://www.prisma.io/)
- Documentation des endpoints Rest générée à partir des schémas OpenAPI avec [widdershins](https://github.com/Mermade/widdershins/)
- [.devcontainer](https://code.visualstudio.com/docs/remote/containers) disponible pour lancer facilement un environnement de développement avec vscode
- Tests d'intégrations avec Jest
- Micro-services rest écrit avec le routeur Express.JS
- Authentification des utilisateurs par jeton JWT avec [express-jwt](https://github.com/auth0/express-jwt)
- Validation avec [zod](https://github.com/colinhacks/zod) des corps de requête
- Api Gateway avec [Krakend-ce](https://github.com/devopsfaith/krakend-ce)
  - Configuration générée à partir des schémas OpenAPI avec [openapi2krakend](https://github.com/okhuz/openapi2krakend)
- Déploiement continu avec Heroku

## 1.2. Résumé du travail réalisé par rapport au spécifications fournies

### 1.2.1. Fonctionnalités

1. [x] En tant que joueur, je peux …

   1. [x] m'inscrire à la plateforme avec un nom d'utilisateur unique.
   2. [x] me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe
   3. [x] voir la liste de joueurs (avec leur score)
   4. [x] voir la liste de matchs
   5. [x] voir les détails d’un match: joueurs, Pokémons utilisés, etc
   6. [x] inviter un autre joueur à un match (creer un match)
   7. [x] consulter les invitations reçues
   8. [x] accepter une invitation à un match (joindre un match existant)
   9. [x] créer un deck pour un match
   10. [x] envoyer un Pokémon à l’arena et consulter le résultat du combat (le joueur n'envoie pas un Pokémon en particulier mais envoie un deck, donc au moins un Pokémon, à l'arena)

2. [ ] En tant qu’administrateur, je peux …

   1. [x] me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe
   2. [x] voir la liste de joueurs
   3. [x] voir la liste de matchs
   4. [ ] effacer et modifier les joueurs et les matchs
   5. [x] consulter les statistiques de la plateforme : nombre de matchs par jour, nombre de matchs par pokemon, nombre de victoires par pokemon, etc

### 1.2.2. Contraintes

1. [x] Pour accéder aux ressources exposées par l’API il faut être authentifié (sauf pour l’inscription et le login)
2. [x] Un joueur ne peut pas participer à plus de 3 matchs simultanés
3. [x] Pour avoir le résultat d’un combat, les deux joueurs ont du avoir envoyé leur Pokémon à l’arena
4. [x] Pour la version final :
   1. [x] On ne peut pas accéder aux endpoints de microservices directement, seulement via un proxy/gateway
   2. [x] Trouver un moyen de produire des statistiques sans requêter directement l’API qui est trop surchargée

## 1.3. Schéma d'architecture

![Schéma d'architecture](./docs/architecture.jpg)

## 1.4. Description des différents services

L'application est divisée en 4 services principaux : user, match, matchmaking, stats

| Nom du service | API Gateway | User service                                                                                                                                                                                                                                                                 | Matchmaking service                                                                                                                                                                                                                                                                                                                                                                    | Stat service                                                                                                                      | Round service                                                   |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Actions        | Interface   | <ul><li>m'inscrire à la plateforme avec un nom d'utilisateur unique.</li> <li>me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe</li> <li>voir la liste de joueurs (avec leur score)</li> <li>effacer et modifier les joueurs (ADMIN)</li></ul> | <ul><li>voir la liste de matchs</li><li>voir les détails d’un match: joueurs, Pokémons utilisés, etc</li> <li>inviter un autre joueur à un match (creer un match)</li> <li>consulter les invitations reçues </li><li>accepter une invitation à un match (joindre un match existant)</li><li>effacer et modifier les matchs (ADMIN only) </li><li>créer un deck pour un match</li></ul> | <ul><li>nombre de matchs par jour,</li> <li>nombre de matchs par pokemon,</li> <li>nombre de victoires par pokemon, etc</li></ul> | envoyer un Pokémon à l’arena et consulter le résultat du combat |
| Dépendances    | *           |                                                                                                                                                                                                                                                                              | User service (besoin du nom d’utilisateur) Pokeapi                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                   | Matchmaking service, Stats service (envoi des stats) Pokeapi    |
| Tables (BDD)   | N/A         | User                                                                                                                                                                                                                                                                         | Match                                                                                                                                                                                                                                                                                                                                                                                  | StatRound                                                                                                                         | N/A (utilise un cache LRU en mémoire vive)                      |

## 1.5. Choix techniques

Plusieurs choix techniques ont étés décidés au cours du développement de l'application pour s'adapter aux imprévus ou améliorer le projet.

### 1.5.1. Généraux

#### 1.5.1.1. Approche "schéma-first" ?

Une approche qui consiste à d'abord penser au schéma d'API avant de coder ! Ca permet de modéliser notre API Rest et de bien y réfléchir (comme en GraphQL).
De plus, le fait d'avoir un schéma OpenAPI permet de générer la documentation et les clients axios facilement !
Le package [@pokefumi/pokefumi-api](./packages//pokefumi-api/) est généré automatiquement à partir des schémas OpenAPI.

#### 1.5.1.2. Pourquoi s'embêter avec Nx ?

[Nx](https://nx.dev/), c'est l'outil de construction fait pour les monorepos.
Il est pratique, et pas pratique à la fois.

- Avantages :
  - génération de code avec des `generators` : les squelettes de code de chaque service ont été générés au départ.
  - executer la construction de tous les services en une seule commande.
  - système de cache : on ne reconstruit les projets que si le code à changé.
  - Hot Module Reload de webpack : c'est mieux que nodemon car on ne recharge que le code changé.
- Désavantages :
  - Nx utilise webpack 5 sous la capot et aucun moyen de le désactiver. On peut avoir des problèmes en Node.JS, par exemple pour détecter les bibliothèques qui sont natives
de celles qui sont téléchargées (voir le fichier [webpack.config.js](./webpack/webpack.config.js) pour voir un workaround)
  - Ca fonctionne très mal avec prisma ! En effet, prisma génère [un client](https://www.prisma.io/docs/concepts/components/prisma-client)
 `@prisma/client` qui sert à contacter la base de données. Le problème est que lorsque plusieurs services utilises prisma, il existe plusieurs `@prisma/client` générés, un pour chaque service.
 Webpack à du mal à différencier les services. Une solution, c'est de faire [ceci](https://github.com/IMT-Atlantique-FIL-2020-2023/Pokefumi/blob/c7d9d2664b1260cdaa3546d270d5692c66c4a62e/apps/matchmaking/prisma/schema.prisma#L6)

#### 1.5.1.3. Prisma ?

[Prisma](https://www.prisma.io/) est un ORM Typescript en plein essor qui permet de gérer la base de données. Il est "type-safe".
Il est très facile à utiliser, mais possèdent quelques inconvénients :

- Il utilise un moteur de requête SQL écrit en Rust, ce qui implique un téléchargement supplémentaire
- Il est encore instable (incompatibilité avec les NPM workspace par ex.).

#### 1.5.1.4. NPM Workspaces : pourquoi nous avons du les abandonner

Les [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces/) sont une fonctionnalité
intéressante, comparable au yarn workspaces mais en moins bien.
Elles sont débarquées en 2020 et restes instables. Elle permettent dans une monorepo
d'installer les dépendance du parent et des enfants en une seule commande. De plus, les dépendances communes entre les enfants sont partagées :
un arbre de dépendance est construit et des liens symboliques sont créés. Cela permet de sauvegarder beaucoup d'espace
de stockage. Hélas, il y a des incompatibilités avec Prisma. De plus, si deux sous-projets utilisent
une même bibliothèque mais avec une version différente, la version la plus haute sera prise.

#### 1.5.1.5. Déploiement continu avec Heroku ?

C'est plus sympathique quand on peut voir le résultat en direct de notre commit !
Heroku permet de déployer chaque micro-service à chaque modification de code. Ils tournent dans une image docker.

### 1.5.2. API Gateway

Nous avons choisi d'utiliser un API Gateway différent que celui vu en cours (Nginx) : [Krakend-ce](https://github.com/devopsfaith/krakend-ce).
Car il :

- est portable (un seul fichier binaire, cross-plateforme)
- écrit en Golang
- facilement extensible avec des plugins téléchargés à la volé
- supporte les Jetons d'authentification JWT gratuitement (ce n'est pas le cas de Nginx, seulement dans la version entreprise)
- possède un très bon module de debug dans la sortie standard
- s'interface bien avec la norme OpenAPI, il existe
un outil nommé [openapi2krakend](https://github.com/okhuz/openapi2krakend) qui permet de générer la configuration Krakend à partir d'un ensemble de schéma OpenAPI

### 1.5.3. User service

@RaphaelPainter à toi de jouer !

### 1.5.4. Matchmaking service

### 1.5.5. Round service

@mlhoutel à toi de jouer !

### 1.5.6. Stats service

## 1.6. Documentation de référence et exemples de requêtes / réponses

> Note: chaque service possède un fichier Openapi décrivant ses endpoints (voir [matchmaking.schema.yaml](./apps/matchmaking/matchmaking.schema.yaml) par exemple). La documentation ci-dessous est générée à l'aide de [widdershins](https://github.com/Mermade/widdershins)

- Service de gestion des utilisateurs, *pour gérer les informations de chaque utilisateur et la création de nouveaux utilisateurs* : [docs/user.md](docs/user.md)
- Service de matchmaking, *pour gérer les invitations à un match vers un autre joueur ou afficher les matchs publics* : [docs/matchmaking.md](docs/matchmaking.md)
- Service de gestion d'un round, *pour gérer le déroulement d'un combat, en confrontant deux à deux chaque pokemon et en donnant le score*: [docs/round.md](docs/round.md)
- Service de statistiques, *pour obtenir les statistiques sur les matchs en général (scores, victoire)* : [docs/stats.md](docs/stats.md)

## 1.7. Pour bien commencer, pour tester les microservices

### 1.7.1. Sans Docker et sans l'API Gateway ("boite blanche")

> Note : l'API Gateway étant une image docker, il est nécessaire d'avoir Docker afin de pouvoir le tester.

Pour lancer : utiliser le [devcontainer vscode](https://code.visualstudio.com/docs/remote/containers), ou installer nx en global (faire la commande dans un terminal) : `npm i -g nx`.

Version de nodejs conseillée : `16.X.X`

#### 1.7.1.1. Premier lancement

1. Installer les dépendances `npm i && nx affected --target=install --all`
2. Générer tous les clients prisma `nx affected --target=generate --all`
3. Créer les BDD sqlite `nx affected --target=push --all`
4. Créer un fichier .env à la racine de chaque micro-service dans `apps/` avec le secret du jeton JWT. Par exemple :

    ```dotenv
    # apps/user/.env

    JWT_SECRET=ILIKEPOTATOES
    ```

5. Ensuite pour lancer le user service : `nx run user:serve`. Pour lancer le matchmaking service par ex. :  `nx run matchmaking:serve`.

#### 1.7.1.2. Executer les tests d'intégration sans API Gateway avec Jest

Des tests automatisés sont disponibles pour tester les services. Ils sont programmés avec Jest. Ils lancent automatiquement les micro-services. Voir [packages/pokefumi-e2e/src/lib/pokefumi-e2e.spec.ts](packages/pokefumi-e2e/src/lib/pokefumi-e2e.spec.ts).

> Note : les bases de données sont effacées au démarrage des tests.  
> Éteignez tous les microservices avant de lancer les tests, ils seront démarrés automatiquement.

```bash
nx run pokefumi-e2e:test-e2e
```

### 1.7.2. Avec Docker, docker-compose et l'API Gateway ("boite noire")

#### 1.7.2.1. Lancement des micro-services

> Note : nous vous conseillons au minimum 5GO d'espace de stockage disponible !

Pour lancer :

- `docker-compose up` : lance la construction de tous les services et les lances avec l'API Gateway

L'API Gateway est accessible sur le port 8000.

#### 1.7.2.2. Tests d'intégration au travers de l'API Gateway avec un script bash

Un fichier [test.sh](./test.sh) est disponible à la racine du projet. Il permet de tester les services en utilisant un script bash.

> Note : vous devez avoir curl et Node.JS d'installé. Un environnement POSIX est conseillé

```bash
bash test.sh
```

Préciser: pourquoi pas de choix du mode workspace ?
Tout mettre du fichier doc ici
Liste de toutes les fonctionnalités, avec test e2e, qui lance les builds et clean les db..
Utilisation de zod

## 1.8. Liste des targets nx

Voici la liste des targets [nx](https://nx.dev/) disponibles :

- `nx affected --target=docs --all` : génère tous les fichiers de documentation à partir des fichier openapi de chaque service
- `nx affected --target=generate --all` : génère tous les clients prisma de chaque service `npx prisma generate`, les clients http de chaque service [packages/pokefumi-api/src/lib/generated-sources/](packages/pokefumi-api/src/lib/generated-sources/) et le serveur du service stats [apps/stats/src/app/generated-oats/](apps/stats/src/app/generated-oats/)
- `nx affected --target=install --all` : installe toutes les dépendances de chaque service `npm install`
- `nx affected --target=push --all` : créer toutes les base de données sqlite de chaque service et synchronise les schémas de BDD `npx prisma db push`
- `nx affected --target=docker --all` : build les images docker de chaque service
- `nx run pokefumi-e2e:test-e2e` : exécute les tests d'intégration
- `nx run-many --target=serve --all` : lance tous les micro-services

## 1.9. Choix de conception

### 1.9.1. API Stats

La première version du service de Stats devait faire appel aux autres
services pour se mettre à jour à la demande du client.
Nous avons pensé que cela entraînait trop de temps
d'attente lors de cette opération et qu'il vaudrait mieux éviter
de faire trop d'appel aux autres services.
Pour cela, la seconde version de l'API Stats, implémentée actuellement, consiste en une mise à jour de sa BDD
en temps réel : pendant le déroulement d'un match, pour chaque round,
le  résultat du round est transmis de façon synchrone au service Stats par le service Round.
On se retrouve donc avec une API Stats qui ne fait que recevoir (et donc transmettre au client/IHM les statistiques agrégées).

### 1.9.2. Distinction entre Matchmaking et Round

La question de la délégation des responsabilités entre les services
a été source de nombreux désaccords dans les différentes phases de
conception et a résulté en différentes versions progressives
au cours du développement du projet.
Cela a notamment été le cas pour les services Matchmaking
et Round, lesquels devaient gérer
le déroulement d'un match. Au départ, nous avons pensé qu'un seul service suffisait
pour assurer cette responsabilité. Puis, nous avons décidé d'en faire deux :  `Matchmaking` et `Round`.
Pour rappel, dans la culture vidéo-ludique,
le matchmaking consiste à la création d'une partie, à la recherche d'autres joueurs et
au lancement d'une partie; ensuite il réapparaît à la fin du match pour afficher les résultats et permettre de
relancer une partie ou d'échanger dans le salon avec les autres joueurs.

### 1.9.3. V1 (version implémentée)

Une API `Matchmaking` gère le déroulement d'un match,
tandis qu'une API `Round` gère un round spécifiquement.
Lorsque 10 rounds sont joués, le match est fermé par le service `Round`
en envoyant une requête "close" au service `Matchmaking`.
Chaque round est stocké en cache dans la mémoire vide pendant un temps donné. Ainsi, le service
`Round` ne possède pas de base de données.
Ce dernier incrémente ensuite le score en envoyant
une requête au service `User`.

### 1.9.4. V2 (non implémenté)

Le service `Round` est divisé en deux services distincts pour améliorer la séparation des responsabilités
et au vu de la taille que le service prend :

- un service qui va gérer la succession des rounds et des scores : `Round`.
- un service qui va gérer les accès avec PokeAPI,
qui traite les informations des pokemon et compare leurs valeurs pour déclarer le gagnant d'un round : `ComputeRound`.

## 1.10. Evolutions possibles de l'application

Nous avons pensé aux aspects futurs de l'application Pokefumi si elle venait à être développée complètement (en plus de la partie Vue et Contrôleur).

### 1.10.1. Système de salon

Actuellement, un salon correspond à un match avec deux joueurs, et se ferme à la fin du match.
Cependant, nous avons pensé qu'un salon pourrait correspondre à une succession de matchs en permettant aux deux joueurs de rejouer directement entre eux, sans devoir créer un nouveau salon et de recommencer le processus d'invitation. Cela permettrait aussi en BDD de limiter la répétition de certaines données, comme le Salon contiendrait une liste de Matchs et plus seulement un Match, et donc il y aurait moins de Salons enregistrés.
  
### 1.10.2. Statistiques sur l'activité

Actuellement, les statistiques se font sur les rounds et non pas les matchs.
Il serait possible en stockant les dates des matchs de stocker le timecode avec les minutes et secondes pour déterminer le temps moyen d'attente entre la création d'un salon et la résolution d'un match.
Il serait aussi possible de faire des statistiques pour suivre la fréquentation de l'application et identifier les pics d'activités, selon le nombre de matchs par jour ou heure. Cela pourrait aussi résulter sur l'affichage d'un graphique montrant visuellement l'évolution de l'activité.

### 1.10.3. Meilleur gestion des erreurs

Ce projet ayant pour vocation d'être une démonstration, la gestion des erreurs restent encore brouillonne. Le service Round par exemple ne renvoi que 2 codes d'erreur et est susceptible de s'arrêter abruptement en cas d'erreur.

### 1.10.4. Bonus 💰 : comment ajouter un service de vente de Pokemon "rares" que l'on peut ajouter à son Docker ?

@RaphaelPainter @mlhoutel