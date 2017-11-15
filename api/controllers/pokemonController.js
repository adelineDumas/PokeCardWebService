'use strict';
var https = require('https');

exports.pokedex = function(req, res) {

	var options = "https://pokeapi.co/api/v2/pokedex/1/"; //pokedex national

	var data = "";

	var request = https.get(options, (result) => {
		result.on('data', (d) => {
			data += d;
		});
		result.on('end', function() {
			var infoPokemon = JSON.parse(data);
			for(var i=0;i<721;i++){
				var id_pkmn = i+1;
				infoPokemon.pokemon_entries[i].pokemon_species["url_img"] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id_pkmn+".png";
			}
			res.json(infoPokemon);
		});
	});

	request.on('error', (e) => {
		console.error(e);
	});

	request.end();
}

exports.pokemon = function(req, res) {

	var pokemonId = params.req.pokemonId;
	var options = "https://pokeapi.co/api/v2/pokemon/"+pokemonId+"/";

	var data = "";

	var request = https.get(options, (result) => {
		result.on('data', (d) => {
			data += d;
		});
		result.on('end', function() {
			res.json(JSON.parse(data));
		});
	});

	request.on('error', (e) => {
		console.error(e);
	});

	request.end();
}
