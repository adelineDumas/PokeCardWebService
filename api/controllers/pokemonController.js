'use strict';
var http = require('http');
var https = require('https');

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
			console.log(infosPokemon);
			var customInfo = {
				"id_pokemon" : infosPokemon.id,
				"name_pokemon" : infosPokemon.name,
				"url_img" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+infosPokemon.id+".png",
				"height" : infosPokemon.height,
				"weight" : infosPokemon.weight,
				"type1" : infosPokemon.types[0].type.name,
				"type2" : (infosPokemon.types[0].type.name) ? infosPokemon.types[1].type.name : "",
				"ability1" : infosPokemon.abilities[0].ability.name,
				"ability2" : (infosPokemon.abilities[1].ability.name) ? infosPokemon.abilities[1].ability.name : ""
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

	var data = "";

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
				response.push(tmpData[pokemonId]);
			}
			res.json(response);
		});
	});
	request.on('error', (e) => {
		console.error(e);
	});

	request.end();

}
