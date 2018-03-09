'use strict';
var http = require('http');
var https = require('https');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'PokeCard'
});

exports.pokedex = function(req, res) {

	var options = "https://pokeapi.co/api/v2/pokedex/1/"; //pokedex national

	var data = "";
	var response = [];
	var request = https.get(options, (result) => {
		result.on('data', (d) => {
			data += d;
		});
		result.on('end', function() {
			var infoPokemon = JSON.parse(data);
			for(var i=0;i<721;i++){
				var id_pkmn = i+1;
				var pkmnTmp = {"id_pokemon":id_pkmn, "name_pokemon": infoPokemon.pokemon_entries[i].pokemon_species.name, "url_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id_pkmn+".png"};
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

exports.pokemon = function(req, res) {

	var pokemonId = req.params.pokemonId;
	var options = "https://pokeapi.co/api/v2/pokemon/"+pokemonId+"/";

	var data = "";
	var response = [];

	var request = https.get(options, (result) => {
		result.on('data', (d) => {
			data += d;
		});
		result.on('end', function() {
			var infosPokemon = JSON.parse(data);
			var customInfo = {
				"id_pokemon" : infosPokemon.id,
				"name_pokemon" : infosPokemon.name,
				"url_img" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+infosPokemon.id+".png",
				"height" : infosPokemon.height,
				"weight" : infosPokemon.weight,
				"type1" : infosPokemon.types[0].type.name,
				"type2" : (infosPokemon.types.length > 1) ? infosPokemon.types[1].type.name : "",
				"ability1" : infosPokemon.abilities[0].ability.name,
				"ability2" : (infosPokemon.abilities.length > 1) ? infosPokemon.abilities[1].ability.name : ""
			};
			res.json(customInfo);
		});
	});

	request.on('error', (e) => {
		console.error(e);
	});

	request.end();
}

exports.booster = function(req, res) {
	var loginUser = req.body.login;//POST
	//var loginUser = req.params.login;//GET

	var options = {
					port: 3000,
					hostname: '127.0.0.1',
					method: 'GET',
					path: '/pokedex',
					headers: {
						'Content-Type': 'application/json'
					}
				};

	var response = [];

	connection.query('SELECT points FROM User WHERE login_user LIKE "' + loginUser + '"', function(error, results, fields) {
		if(error){
			console.error(error);
			res.json({ response: false });
		}
		else{
			if(results[0].points >= 10){
				var data = "";
				var requeteInsertion = 'INSERT INTO Collection_User VALUES ';

				var request = http.get(options, (result) => {
						result.on('data', (d) => {
							data += d;
						});
						result.on('end', function() {
							var tmpData = JSON.parse(data);
							for(var i=0;i<15;i++){
								var min = Math.ceil(1);
								var max = Math.floor(721);
								var pokemonId = Math.floor(Math.random() * (max - min +1)) + min;
								requeteInsertion += '(NULL, "' + loginUser + '", "' + pokemonId + '"),';
								response.push(tmpData[pokemonId]);
							}
							requeteInsertion = requeteInsertion.substring(0, requeteInsertion.length - 1);
							connection.query(requeteInsertion, function(error, results, fields) {
								if(error){
									res.json({ response: false });
								}
								else{
									connection.query('UPDATE User SET points = points-10 WHERE login_user LIKE "' + loginUser + '"', function(error, results, fields) {
										if(error){
											console.error(error);
											res.json({ response: false });
										}
										else{
											res.json(response);
										}
								});
							}
						});
						});
				});
				request.on('error', (e) => {
					console.error(e);
				});
				request.end();
			}
			else{
				res.json({ response: false });
			}
		}
	});
};
