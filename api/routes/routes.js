'use strict';
module.exports = function(app) {
	var pokemonController = require('../controllers/pokemonController');
	var userController = require('../controllers/userController');

	app.route('/pokedex').get(pokemonController.pokedex);//affichage du pokedex
	app.route('/pokemon/:pokemonId').get(pokemonController.pokemon);//affichage d'un pokemon
	app.route('/getbooster').get(pokemonController.booster);//obtention d'un booster (15 pokemons aleatoires)
	app.route('/verifylogin').post(userController.verifylogin);//vérification du login et du mdp
	//app.route('/collectionuser').post(userController.collection);//affichage de la collection de l'utilisateur connecté
	app.route('/collectionuser/:login').get(userController.collection);//idem avec get pour test via url
	//app.route('/exchangereq').post(userController.exchangereq);//demande d'échange et affichage des demande en cours
	app.route('/exchangereq/:login/:pokemonId').get(userController.exchangereq);//idem avec get pour test via url
	//app.route('/exchangewith').post(userController.exchangewith);//echange avec un autre utilisateur
	app.route('/exchangewith/:login1/:login2').get(userController.exchangewith);//idem avec get pour test via url
	//app.route('/signup').post(authController.signup);//deconnexion
	//app.route('/listeamis').get(pokemonController.amis);//affichage de la liste d'ami(s)

};
