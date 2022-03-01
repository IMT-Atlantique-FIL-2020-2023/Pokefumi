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

Pour lancer : utiliser le devcontainer, ou installer nx en global (faire la commande dans un terminal ): `npm i -g nx`.
Version de nodejs conseillée : 16.X.X
Ensuite pour lancer le user service : `nx run user:serve`.
Pour lancer le matchmaking service :  `nx run matchmaking:serve`.
> TODO à compléter en donnant des indications sur les commandes à utiliser et les requêtes

## Description des différents services
L'application est divisée en 4 services principaux : user, match, matchmaking, stats
Pour chaque service, vous pouvez trouver un schéma OpenAPI décrivant techniquement leurs fonctionnalités, dans les fichiers /apps/*/*.schema.yml, * étant le nom du service voulu.

Ci-dessous voici un description succinte de quelques endpoint. La documentation exhaustive de chaque service se trouve dans son fichier <service>.schema.yaml. Celle-ci peut-être visualiser à partir d'un éditeur swagger.

### User
Pour gérer les informations de chaque utilisateur et la création de nouveaux utilisateurs.
#### ```/users```
GET : Renvoie la liste de tous les utilisateurs existants en BDD
POST: Crée un nouvel utilisateur
> comment activer la version post et la version get ?
#### ```/users/{id}```
GET : Cherche un utilisateur par son id et le renvoie

### Match
Pour gérer le déroulement d'un combat, en confrontant deux à deux chaque pokemon et en donnant le score. A chaque round, les joeuurs choississent un pokemon de leur deck et l'api renvoie le résultat de la confrontation.

#### ```/api```
GET : Vérifie si la connexion avec l'api est disponible et renvoie le résultat
> Quelle api ? La pokeAPI ?
#### ```/pokemons```
GET : Renvoie la liste des pokemons existants
#### ```/pokemons/{id}```
GET : Renvoie un pokemon spécifique selon son id
#### ```/pokemons/name/{name}```
GET : Renvoie un pokemon spécifique selon son nom
#### ```/types```
GET : Renvoie la liste des types de pokemon existants
#### ```/types/{id}```
GET : Renvoie un type spécifique selon son id
#### ```/types/name/{name}```
GET : Renvoie un type spécifique selon son nom
#### ```/round/{id1}/{id2}```
GET : Renvoie le résultat d'un round confrontant deux pokemon identifiés selon leurs id.
#### ```/round/name/{name1}/{name2}```
GET : Renvoie le résultat d'un round confrontant deux pokemon identifiés selon leurs noms

### Matchmaking 
Pour gérer les invitations à un match vers un autre joueur ou afficher les matchs publics.

### Stats
Pour gérer les statitiques liés à un utilisateur ou sur les matchs en général (scores, victoire, ) sur les 30 derniers jours.
#### ```/matchs/count-a-day-last-30-days```
GET : Renvoie le nombre de matchs réalisés dans les 30 derniers jours
> TODO à vérifier si total des 30j ou si nb de chaque jour ou si nb max du mois
#### ```/pokemons/{id}/number-of-matchs```
GET : Renvoie le nombre de matchs où un pokemon spécifique a participé
#### ```/pokemons/{id}/number-of-victories```
GET : Renvoie le nombre de matchs où un pokemon spécifique a participé et qui ont été gagnés
> TODO : est-ce que c'est le match qui doit être gagné ou le round du pokemon ?
#### ```/pokemons/matchs```
GET : Renvoie la liste des pokemons avec leur nombre de participation dans des matchs
> Sur une date limite ?


# Scénario de test
> TODO


# Choix techniques
Plusieurs choix techniques ont étés décidés au cours du développement de l'application pour s'adapter aux imprévus ou améliorer le projet.

## API Stats
La première version du service de Stats devait faire appel aux autres services pour se mettre à jour à la demande du client. 
Nous avons pensé que cela entrainait trop de temps d'attente lors de cette opération et qu'il vaudrait mieux éviter de permettre à l'API Stats d'intéragir avec les autres BDD.
Pour cela, la seconde version de l'API Stats consiste en une mise à jour de sa BDD en temps réeel : pendant le déroulement d'un match et d'un roud, chaque résultat est transmis de façon synchrone au service Stats par les autres API. On se retrouve donc avec une API Stats qui ne fait que recevoir (ou transmettre au client/IHM les résultats demandés).

## Distinction entre Matchmaking et Match
La question de la déléguation des responsabilités entre les services à était la source de nombreux désaccord dans les différentes phases de conception et a résulté en différentes versions progressives au cours du développement du projet.
Cela a notamment été le cas pour les services Matchmaking et Match, sur lequel devait gérer les requêtes pour le déroulement d'un match et en stocker les données. Pour rappel, dans la culture jeux-vidéo, le matchmaking consiste à la création d'une partie, à la recherche d'autres joueurs et au lancement d'une partie; ensuite il réapparaît à la fin du match pour afficher les résultats et permettre de relancer une partie ou d'échanger dans le salon avec les autres joueurs.

## V1
Une API Matchmaking gérait le déroulement d'un match, tandis qu'une API Round gérait un round spécifiquement.

## V2
Le matchmaking est décorréler du match : 
- l'API Match est capable de solliciter PokeAPI pour résoudre un match avec la succession de rounds, la transformant en un "simple client" servant d'interface entre Pokefumi et PokeApi.
- une notion de salon a été ajoutée en BDD : 1 salon = 1 match
  cf. la partie Evolutions possibles de l'application pour voir un des objectifs de cette modification
  
## V3
Le service Match est divisé en deux services distincts pour amélorier la séparation des responsabilités et au vu de la taille que le service prenait :
- un service qui va gérer la succession des rounds et des scores
- un service qui va gérer les accès avec PokeAPI, qui traite les informations des pokemon et compare leurs valeurs pour déclarer le gagnant d'un round.
> TODO mettre les noms des services quand ils auront été développés
Le premier service va faire appel au second à chaque round en transmettant les deux pokemon du round, et en récupérant le pokemon gagnant du round. Cela va permettre d'extraire la logique et le code métier lié aux pokemons de l'API Match.


# Evolutions possibles de l'application
Nous avons pensé aux aspects futurs de l'application Pokefumi si elle venait à être développée complétement (en plus de la partie Vue et Contrôleur).

## Système de salon
Actuellement, un salon correspond à un match avec deux joueurs, et se ferme à la fin du match.
Cependant, nous avons pensé qu'un salon pourrait correspondre à une succession de matchs en permettant aux deux joueurs de rejouer directement entre eux, sans devoir créer un nouveau salon et de recommencer le processus d'invitation. Cela permettrait aussi en BDD de limiter la répétition de certaines données, comme le Salon contiendrait une liste de Matchs et plus seulement un Match, et donc il y aurait moins de Salons enregistrés.
  
## Statistiques sur l'activité
Il serait possible en stockant les dates des matchs de stocker le timecode avec les minutes et secondes pour déterminer le temps moyen d'attente entre la création d'un salon et la résolution d'un match.
Il serait aussi possible de faire des statistiques pour suivre la fréquentation de l'application et identifier les pics d'activités, selon le nombre de matchs par jour ou heure. Cela pourrait aussi résulter sur l'affichage d'un graphique montrant visuellement l'évolution de l'activité.

  
# Geraud

Il faut faire en sorte que les services puissent remplir les fonctionnalités nécessaire pour faire des stats.

Voici ce que le service de stats doit être capable de faire : 

- nombre de matchs par jour (service matchmaking)
- nombre de matchs par pokemon (service match)
- nombre de victoires par pokemon (service match)

Le service match a déjà tout ce qu'il faut.
Par contre le service matchmaking : il manque une date de création sur les matchs, à la fois dans le schéma de BDD et dans la partie modèle. Il manque aussi son schéma openapi.
