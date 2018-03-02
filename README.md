# PokeCardWebServices

- Installer Node JS (https://nodejs.org/en) sur votre poste

- Installer Xamp (ou Wamp pour Windows) puis démarrer votre base de données MySQL

- Faire un git clone de ce projet

- Ouvrez un terminal

 - Aller dans le dossier que vous venez de cloner

- Lancer la commande "npm install" pour installer les modules Node JS (un dossier node_modules devrait apparaître dans votre projet)

- Lancer la commande "npm run start" pour démarrer le serveur

- L'adresse pour utiliser votre webservice est localhost:3000

LES ROUTES :

GET : '/pokedex' -> affichage du pokedex
GET : '/pokemon/:pokemonId' -> affichage d'un pokemon
GET : '/getbooster' -> obtention d'un booster (15 pokemons aleatoires)
POST : '/verifylogin' -> vérification du login et du mdp
POST : '/collectionuser' -> affichage de la collection de l'utilisateur connecté
POST : '/exchangereq' -> demande d'échange et affichage des demande en cours
POST : '/exchangewith' -> echange avec un autre utilisateur
POST : '/signup' -> deconnexion
