#PokeCard WebServices

- Installer Node JS (https://nodejs.org/en) sur votre poste

- Installer Xamp (ou Wamp pour Windows) puis démarrer votre base de données MySQL

- Faire un git clone de ce projet

- Ouvrez un terminal

- Aller dans le dossier que vous venez de cloner

- Lancer la commande "npm install" pour installer les modules Node JS (un dossier node_modules devrait apparaître dans votre projet)

- Lancer la commande "npm run start" pour démarrer le serveur

- L'adresse pour utiliser votre webservice est localhost:3000

#LES ROUTES :

| __TYPE__    | __Route__                 | __Fonction__                                                                                                   |
| ------------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| GET         | /pokedex                  | affichage du pokedex                                                                                           |
| GET         | /pokemon/:pokemonId       | permet d’obtenir les informations d’un pokemon avec son id                                                     |
| POST        | /getbooster               | renvoie 15 pokemons aléatoires et les ajoute dans la collection de l’utilisateur                               |
| GET         | /searchpkmn/:name_pokemon | permet de rechercher tous les pokemons possédant la chaîne name_pokemon                                        |
| POST        | /verifylogin              | vérifie si le login et le mot de passe correspondent à un compte existant                                      |
| POST        | /collectionuser           | renvoie la collection de pokemons de l’utilisateur                                                             |
| POST        | /exchangereq              | insère une demande d’échange en base                                                                           |
| POST        | /exchangewith             | échange les pokemons entre les 2 utilisateurs                                                                  |
| POST        | /signup                   | insère un nouvel utilisateur en base                                                                           |
| POST        | /addfriend                | ajoute un utilisateur à la liste d’amis de l’utilisateur connecté                                              |
| POST        | /deletefriend             | supprime un ami de la liste d’amis de l’utilisateur connecté                                                   |
| GET         | /searchuser/:string_user  | permet de rechercher tous les utilisateurs possédant la chaîne name_pokemon, excepté l’utilisateur connecté    |
| GET         | /randomuser/:login        | renvoie 15 utilisateurs aléatoire excepté l’utilisateur connecté                                               |
| POST        | /friendslist              | renvoie la liste d’ami de l’utilisateur connecté                                                               |
