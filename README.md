# Pokefumi
Poke-fu-mi est une application qui permet d'organiser des combats entre maîtres Pokémon mais les règles ne sont pas exactement celles du jeu classique.

Pour lancer : utiliser le devcontainer, ou installer nx en global (faire la commande dans un terminal ): `npm i -g nx`.
Version de nodejs conseillée : 16.X.X
Ensuite pour lancer le user service : `nx run user:serve`.
Pour lancer le matchmaking service :  `nx run matchmaking:serve`.


## Description des différents services
L'application est divisée en 4 services principaux : user, match, matchmaking, stats
Pour chaque service, vous pouvez trouver un schéma OpenAPI décrivant techniquement leurs fonctionnalités, dans les fichiers /apps/*/*.schema.yml, * étant le nom du service voulu.

### User
Pour gérer les informations de chaque utilisateur et la création de nouveaux utilisateurs.
#### /users
GET : Renvoie la liste de tous les utilisateurs existants en BDD
POST: Crée un nouvel utilisateur
> comment activer la version post et la version get ?
#### /users/{id}
GET : Cherche un utilisateur par son id et le renvoie

### Match
Pour gérer le déroulement d'un combat, en confrontant deux à deux chaque pokemon et en donnant le score.
#### /api
GET : Vérifie si la connexion avec l'api est disponible et renvoie le résultat
> Quelle api ? La pokeAPI ?
#### /pokemons
GET : Renvoie la liste des pokemons existants
#### /pokemons/{id}
GET : Renvoie un pokemon spécifique selon son id
#### /pokemons/name/{name}
GET : Renvoie un pokemon spécifique selon son nom
#### /types
GET : Renvoie la liste des types de pokemon existants
#### /types/{id}
GET : Renvoie un type spécifique selon son id
#### /types/name/{name}
GET : Renvoie un type spécifique selon son nom
#### /bagarre/{id1}/{id2}
GET : Renvoie le résultat d'un round confrontant deux pokemon identifiés selon leurs id
> Pourquoi ne pas avoir fait une requete sous la forme /bagarre/{id1}&{id2} comme pour des url ?
#### /bagarre/name/{name1}/{name2}
GET : Renvoie le résultat d'un round confrontant deux pokemon identifiés selon leurs noms

### Matchmaking 
Pour gérer les invitations à un match vers un autre joueur ou afficher les matchs publics.

### Stats
Pour gérer les statitiques liés à un utilisateur ou sur les matchs en général (scores, victoire, ) sur les 30 derniers jours.
#### /matchs/count-a-day-last-30-days
GET : Renvoie le nombre de matchs réalisés dans les 30 derniers jours
> TODO à vérifier si total des 30j ou si nb de chaque jour ou si nb max du mois
#### /pokemons/{id}/number-of-matchs
GET : Renvoie le nombre de matchs où un pokemon spécifique a participé
#### /pokemons/{id}/number-of-victories
GET : Renvoie le nombre de matchs où un pokemon spécifique a participé et qui ont été gagnés
> TODO : est-ce que c'est le match qui doit être gagné ou le round du pokemon ?
#### /pokemons/matchs
GET : Renvoie la liste des pokemons avec leur nombre de participation dans des matchs
> Sur une date limite ?

# Geraud

Il faut faire en sorte que les services puissent remplir les fonctionnalités nécessaire pour faire des stats.

Voici ce que le service de stats doit être capable de faire : 

- nombre de matchs par jour (service matchmaking)
- nombre de matchs par pokemon (service match)
- nombre de victoires par pokemon (service match)

Le service match a déjà tout ce qu'il faut.
Par contre le service matchmaking : il manque une date de création sur les matchs, à la fois dans le schéma de BDD et dans la partie modèle. Il manque aussi son schéma openapi.
