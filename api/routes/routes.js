'use strict';
module.exports = function(app) {
	var pokemonController = require('../controllers/pokemonController');
	var authController = require('../controllers/userController');

	app.route('/pokedex').get(pokemonController.pokedex);
	app.route('/pokemon/:pokemonId').get(pokemonController.pokedex);
	//app.route('/verifylogin').post(authController.login);
	//app.route('/signup').post(authController.signup);
	//app.route('/collection').get(pokemonController.collection);
	//app.route('/listeamis').get(pokemonController.amis);

};
