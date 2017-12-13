'use strict';
var https = require('https');
var mysql = require('mysql');
var sha1 = require('sha1');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'PokeCard'
});

connection.connect();

exports.verifylogin = function(req, res) {
	var loginUser = req.body.login;
	var password = req.body.password;
	connection.query('SELECT * FROM User WHERE login_user LIKE "' + loginUser + '"', function(error, results, fields) {
		if(results.length > 0) {
			if(sha1(password) == results[0].password) {
				res.json(results[0]);
			}
			else {
				res.json({ password: false });
			}
		}
		else {
			res.json({ user: false });
		}
	});
}

exports.collection = function(req, res) {
  var loginUser = req.body.login;

	connection.query('SELECT id_pokemon FROM Collection_User WHERE login_user LIKE "' + loginUser + '"', function(error, results, fields) {
		if(results.length > 0) {

				var options = "https://pokeapi.co/api/v2/pokedex/1/"; //pokedex national

				var data = "";
				var response = [];
				var request = https.get(options, (result) => {
					result.on('data', (d) => {
						data += d;
					});
					result.on('end', function() {
						var infoPokemon = JSON.parse(data);
						for(var i=0;i<results.length;i++){
							var pkmnTmp = {"id_pokemon":results[i].id_pokemon, "name_pokemon": infoPokemon.pokemon_entries[results[i].id_pokemon-1].pokemon_species.name, "url_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+results[i].id_pokemon+".png"}
							response.push(pkmnTmp);
						}
						res.json(response);
					});
				});
				request.on('error', (e) => {
					console.error(e);
				});
				request.end();
		}
		else {
        res.json({ collection: false });
		}
	});
}

/*exports.listeamis = function(req, res){
		connection.query('SELECT * FROM Collection_User WHERE login_user LIKE "' + global.user["login"] + '"', function(error, results, fields){
			if(results){
				res.json({"amis": results});
			}
			else{
				res.json({amis : false});
			}
		});
}*/

/*exports.signup = function(req, res) {
	//TODO
}*/
