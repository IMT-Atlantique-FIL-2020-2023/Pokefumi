Ceci est un microservice qui gère des utilisateurs.

## Se placer dans le répertoire de l'application
cd services/User

## Sans Docker:

##### Installer les dépendances
```
npm i
```


##### Démarrer l'API
```
npm start
```

## Avec Docker:

##### Build l'image
```
docker build -f .\Dockerfile.user . -t userservice
```

##### Exécuter l'image
```
docker run userservice
```
