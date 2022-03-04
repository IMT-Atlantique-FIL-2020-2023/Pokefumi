# Pokefumi

Poke-fu-mi est une application qui permet d'organiser des combats entre maîtres Pokémon mais les règles ne sont pas exactement celles du jeu classique.

Dans la version actuelle, le projet est composé des différents services avec leurs requêtes, mais sans le code métier pour relier les services en un tout cohérent avec une interface.
Pour le déroulement d'une partie, voilà ce qu'il se passe (en considérant que les joueurs ont déjà créé un compte et ont composé une liste de pokemon pour jouer) :

- Un joueur crée un Salon.
- Un second joueur peut rejoindre le salon par une invitation, sinon en accédant à un salon public sans invitation.
- Le match est lancé, les 10 pokemon de chaque joueurs vont être confrontés dans une succession de rounds 2 à 2.
- Chaque round consiste à comparer les types de chaque pokemon et à déclarer le vainqueur du round selon le nombre de points gagnés pour chaque type supérieur à l'adversaire.
- Lorsque les 10 rounds ont été réalisés, le joueur vainqueur du match est celui qui aura accumulé le plus de points.
- Le salon est clos. Pour lancer une nouvelle partie, le joueur revient à l'étape 1.

## Pour bien commencer (sans docker-compose)

Pour lancer : utiliser le devcontainer, ou installer nx en global (faire la commande dans un terminal ): `npm i -g nx`.
Version de nodejs conseillée : 16.X.X

1. Installer les dépendances `npm i && nx affected --target=install --all`
2. Générer tous les clients prisma `nx affected --target=generate --all`
3. Créer les BDD sqlite `nx affected --target=push --all`
4. Ensuite pour lancer le user service : `nx run user:serve`. Pour lancer le matchmaking service :  `nx run matchmaking:serve`.

## Pour bien commencer (sans docker-compose)

Pour lancer : 

- `docker-compose up`: lance tous les services

## Liste des targets nx

- `nx affected --target=docs --all` : génère tous les fichiers de documentation à partir des fichier openapi de chaque service
- `nx affected --target=generate --all` : génère tous les clients prisma de chaque service `npx prisma generate`, les clients http de chaque service [packages/pokefumi-api/src/lib/generated-sources/](packages/pokefumi-api/src/lib/generated-sources/) et le serveur du service stats [apps/stats/src/app/generated-oats/](apps/stats/src/app/generated-oats/)
- `nx affected --target=install --all` : installe toutes les dépendances de chaque service `npm install`
- `nx affected --target=push --all` : créer toutes les base de données sqlite de chaque service et synchronise les schémas de BDD `npx prisma db push`
- `nx affected --target=docker --all` : build les images docker de chaque service

## Description des différents services

L'application est divisée en 4 services principaux : user, match, matchmaking, stats
Pour chaque service, vous pouvez trouver un schéma OpenAPI décrivant techniquement leurs fonctionnalités, dans les fichiers /apps/*/*.schema.yml, * étant le nom du service voulu.

Ci-dessous voici un description succincte de quelques endpoint. La documentation exhaustive de chaque service se trouve dans son fichier service.schema.yaml. Celle-ci peut-être visualiser à partir d'un éditeur swagger.

### User

Pour gérer les informations de chaque utilisateur et la création de nouveaux utilisateurs.

Voir la documentation de l'API ici [docs/user.md](docs/user.md)

### Round

Pour gérer le déroulement d'un combat, en confrontant deux à deux chaque pokemon et en donnant le score.

Voir la documentation de l'API ici [docs/round.md](docs/round.md)

### Matchmaking

Pour gérer les invitations à un match vers un autre joueur ou afficher les matchs publics.

Voir la documentation de l'API ici [docs/matchmaking.md](docs/matchmaking.md)

### Stats

Pour gérer les statistiques liés à un utilisateur ou sur les matchs en général (scores, victoire, ) sur les 30 derniers jours.

Voir la documentation de l'API ici [docs/stats.md](docs/stats.md)

## Scénario de test

> TODO

## Choix techniques

Plusieurs choix techniques ont étés décidés au cours du développement de l'application pour s'adapter aux imprévus ou améliorer le projet.

## API Stats

La première version du service de Stats devait faire appel aux autres services pour se mettre à jour à la demande du client.
Nous avons pensé que cela entraînait trop de temps d'attente lors de cette opération et qu'il vaudrait mieux éviter de permettre à l'API Stats d'intéragir avec les autres BDD.
Pour cela, la seconde version de l'API Stats consiste en une mise à jour de sa BDD en temps réel : pendant le déroulement d'un match et d'un roud, chaque résultat est transmis de façon synchrone au service Stats par les autres API. On se retrouve donc avec une API Stats qui ne fait que recevoir (ou transmettre au client/IHM les résultats demandés).

## Distinction entre Matchmaking et Match

La question de la délégation des responsabilités entre les services à était la source de nombreux désaccord dans les différentes phases de conception et a résulté en différentes versions progressives au cours du développement du projet.
Cela a notamment été le cas pour les services Matchmaking et Match, sur lequel devait gérer les requêtes pour le déroulement d'un match et en stocker les données. Pour rappel, dans la culture jeux-vidéo, le matchmaking consiste à la création d'une partie, à la recherche d'autres joueurs et au lancement d'une partie; ensuite il réapparaît à la fin du match pour afficher les résultats et permettre de relancer une partie ou d'échanger dans le salon avec les autres joueurs.

## V1

Une API Matchmaking gérait le déroulement d'un match, tandis qu'une API Round gérait un round spécifiquement.

## V2

Le matchmaking est décorréler du match :

- l'API Match est capable de solliciter PokeAPI pour résoudre un match avec la succession de rounds, la transformant en un "simple client" servant d'interface entre Pokefumi et PokeApi.
- une notion de salon a été ajoutée en BDD : 1 salon = 1 match
  cf. la partie Evolutions possibles de l'application pour voir un des objectifs de cette modification
  
## V3

Le service Match est divisé en deux services distincts pour améliorer la séparation des responsabilités et au vu de la taille que le service prenait :

- un service qui va gérer la succession des rounds et des scores
- un service qui va gérer les accès avec PokeAPI, qui traite les informations des pokemon et compare leurs valeurs pour déclarer le gagnant d'un round.

> TODO mettre les noms des services quand ils auront été développés
Le premier service va faire appel au second à chaque round en transmettant les deux pokemon du round, et en récupérant le pokemon gagnant du round. Cela va permettre d'extraire la logique et le code métier lié aux pokemons de l'API Match.

## Evolutions possibles de l'application

Nous avons pensé aux aspects futurs de l'application Pokefumi si elle venait à être développée complétement (en plus de la partie Vue et Contrôleur).

### Système de salon

Actuellement, un salon correspond à un match avec deux joueurs, et se ferme à la fin du match.
Cependant, nous avons pensé qu'un salon pourrait correspondre à une succession de matchs en permettant aux deux joueurs de rejouer directement entre eux, sans devoir créer un nouveau salon et de recommencer le processus d'invitation. Cela permettrait aussi en BDD de limiter la répétition de certaines données, comme le Salon contiendrait une liste de Matchs et plus seulement un Match, et donc il y aurait moins de Salons enregistrés.
  
### Statistiques sur l'activité

Il serait possible en stockant les dates des matchs de stocker le timecode avec les minutes et secondes pour déterminer le temps moyen d'attente entre la création d'un salon et la résolution d'un match.
Il serait aussi possible de faire des statistiques pour suivre la fréquentation de l'application et identifier les pics d'activités, selon le nombre de matchs par jour ou heure. Cela pourrait aussi résulter sur l'affichage d'un graphique montrant visuellement l'évolution de l'activité.

## Geraud

Il faut faire en sorte que les services puissent remplir les fonctionnalités nécessaire pour faire des stats.

Voici ce que le service de stats doit être capable de faire :

- nombre de matchs par jour (service matchmaking)
- nombre de matchs par pokemon (service match)
- nombre de victoires par pokemon (service match)

Le service match a déjà tout ce qu'il faut.
Par contre le service matchmaking : il manque une date de création sur les matchs, à la fois dans le schéma de BDD et dans la partie modèle. Il manque aussi son schéma openapi.
