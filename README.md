# Pokefumi
Poke-fu-mi est une application qui permet d'organiser des combats entre maîtres Pokémon mais les règles ne sont pas exactement celles du jeu classique.

Pour lancer : utiliser le devcontainer, ou installer nx en global (faire la commande dans un terminal ): `npm i -g nx`.
Version de nodejs conseillée : 16.X.X
Ensuite pour lancer le user service : `nx run user:serve`.
Pour lancer le matchmaking service :  `nx run matchmaking:serve`.

## Geraud

Il faut faire en sorte que les services puissent remplir les fonctionnalités nécessaire pour faire des stats.

Voici ce que le service de stats doit être capable de faire : 

- nombre de matchs par jour (service matchmaking)
- nombre de matchs par pokemon (service match)
- nombre de victoires par pokemon (service match)

Le service match a déjà tout ce qu'il faut.
Par contre le service matchmaking : il manque une date de création sur les matchs, à la fois dans le schéma de BDD et dans la partie modèle. Il manque aussi son schéma openapi.
