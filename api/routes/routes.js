'use strict';
module.exports = function(app) {
	var pokemonController = require('../controllers/pokemonController');
	var userController = require('../controllers/userController');

	app.route('/pokedex').get(pokemonController.pokedex);//affichage du pokedex
	app.route('/pokemon/:pokemonId').get(pokemonController.pokemon);//affichage d'un pokemon
	app.route('/getbooster/:login').get(pokemonController.booster);//obtention d'un booster (15 pokemons aleatoires)
	app.route('/getbooster').post(pokemonController.booster);//obtention d'un booster (15 pokemons aleatoires)
	app.route('/searchpkmn/:string_pkmn').get(pokemonController.searchpkmn);//recherche de pokemon
	app.route('/verifylogin').post(userController.verifylogin);//vérification du login et du mdp
	app.route('/collectionuser').post(userController.collection);//affichage de la collection de l'utilisateur connecté
	app.route('/collectionuser/:login').get(userController.collection);//idem avec get pour test via url
	app.route('/exchangereq').post(userController.exchangereq);//demande d'échange et affichage des demande en cours
	app.route('/exchangereq/:login_user/:id_pokemon?/:nom_pokemon?/:url?').get(userController.exchangereq);//idem avec get pour test via url
	app.route('/exchangewith').post(userController.exchangewith);//echange avec un autre utilisateur
	app.route('/exchangewith/:login1/:login2/:idPokemon1/:idPokemon2').get(userController.exchangewith);//idem avec get pour test via url
	app.route('/signup').post(userController.signup);//deconnexion
	app.route('/signup/:login_user/:password/:mail').get(userController.signup);//deconnexion
	app.route('/addfriend').post(userController.addfriend);//ajout d'ami
	app.route('/addfriend/:login_user/:login_friend').get(userController.addfriend);//ajout d'ami
	app.route('/deletefriend').post(userController.deletefriend);//suppression d'un ami
	app.route('/deletefriend/:login_user/:login_friend').get(userController.deletefriend);//suppression d'un ami
	app.route('/searchuser/:string_user').get(userController.searchuser);//recherche d'ami
	app.route('/randomuser/:login').get(userController.randomuser);//affichage de personnes aléatoires
	app.route('/friendslist').post(userController.friendslist);//affichage de la liste d'ami(s)
	app.route('/friendslist/:login_user').get(userController.friendslist);//affichage de la liste d'ami(s)

};
