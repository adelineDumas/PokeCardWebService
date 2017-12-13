'use strict';
module.exports = function(app) {
	var pokemonController = require('../controllers/pokemonController');
	var userController = require('../controllers/userController');

	app.route('/pokedex').get(pokemonController.pokedex);
	app.route('/pokemon/:pokemonId').get(pokemonController.pokemon);
	app.route('/getbooster').get(pokemonController.booster);
	app.route('/verifylogin').post(userController.verifylogin);
	app.route('/collectionuser').post(userController.collection);
	//app.route('/collectionuser/:login').get(userController.collection);
	//app.route('/signup').post(authController.signup);
	//app.route('/listeamis').get(pokemonController.amis);

};
