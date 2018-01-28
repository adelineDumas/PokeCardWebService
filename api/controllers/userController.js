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
				res.json({ password: false });//mauvais mot de passe
			}
		}
		else {
			res.json({ user: false });//utilisateur inconnu
		}
	});
}

exports.collection = function(req, res) {
  var loginUser = req.body.login; // POST
  //var loginUser = req.params.login; // GET


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
        	res.json({ response: false });
		}
	});
}

exports.exchangereq = function(req, res) {
	var loginUser = req.body.login_user;
	//var loginUser = req.params.login;
	var pokemonId = req.body.id_pokemon;
	//var pokemonId = req.params.pokemonId;
	var nomPokemon = req.body.nom_pokemon;
	var url = req.body.url;

	connection.query('INSERT INTO Requete_Echange VALUES (NULL,"' + loginUser + '", "' + pokemonId + '", "' + nomPokemon + '", "' + url + '")', function(error, results, fields) {
		console.log('Y A UNE ERREUR GROS INSERT INTO Requete_Echange VALUES (NULL,"' + loginUser + '", "' + pokemonId + '")');
		if(error) {
			res.json({ response: false });
		}
	});

	connection.query('SELECT login_user, id_pokemon, nom_pokemon, url FROM Requete_Echange WHERE login_user NOT LIKE "' + loginUser + '"', function(error, results, fields) {
		if(error){
			res.json({ response: false });//aucun résultat à cause d'une erreur
		}
		if(results.length >= 1) {
			var data = [];
			for(var i=0;i<results.length;i++){
				var line = {"login_user": results[i].login_user, "id_pokemon": results[i].id_pokemon, "nom_pokemon": results[i].nom_pokemon, "url": results[i].url};
				data.push(line);
			}
			res.json(data);
		}
		else {
			res.json({ response: true });//aucun résultat car la seule demande d'échange est la notre
		}
	});
}

exports.exchangewith = function(req, res) {
	var loginUser1 = req.body.loginUser1; //POST
	//var loginUser1 = req.params.login1; //GET
	var loginUser2 = req.body.loginUser2; //POST
	//var loginUser2 = req.params.login2; //GET

	var pokemonId1, pokemonId2, idLignePkmnUser1, idLignePkmnUser2;

	//On récupère l'id du pokemon que l'utilisateur 1 veut échanger
	connection.query('SELECT id_pokemon FROM Requete_Echange WHERE login_user LIKE "' + loginUser1 + '"', function(error, results, fields) {
		if(error){
			res.json({ response: false });
		}
		if(results.length > 0) {
			pokemonId1 = results[0].id_pokemon;
			//On récupère l'id du pokemon que l'utilisateur 2 veut échanger
			connection.query('SELECT id_pokemon FROM Requete_Echange WHERE login_user LIKE "' + loginUser2 + '"', function(error, results, fields) {
				if(error){
					res.json({ response: false });
				}
				if(results.length > 0) {
					pokemonId2 = results[0].id_pokemon;

					//On récupère l'id de la ligne du pokemon dans la collection de l'utilisateur 1
					connection.query('SELECT id_ligne FROM Collection_User WHERE login_user LIKE "' + loginUser1  + '" AND id_pokemon LIKE "' + pokemonId1 + '"', function(error, results, fields) {
						if(error){
							res.json({ response: false });
						}
						if(results.length > 0){
							idLignePkmnUser1 = results[0].id_ligne;//On prend toujours le 1er pokemon (il peut y avoir plusieurs pokemons identiques)

							//On récupère l'id de la ligne du pokemon dans la collection de l'utilisateur 2
							connection.query('SELECT id_ligne FROM Collection_User WHERE login_user LIKE "' + loginUser2 + '" AND id_pokemon LIKE "' + pokemonId2 + '"', function(error, results, fields) {
								if(error){
									res.json({ response: false });
								}
								if(results.length > 0){
									idLignePkmnUser2 = results[0].id_ligne;//On prend toujours le 1er pokemon (il peut y avoir plusieurs pokemons identiques)

									//on effectue l'échange
									connection.query('INSERT INTO Collection_User VALUES (NULL,"' + loginUser1 + '", "' + pokemonId2 + '"),(NULL,"' + loginUser2 + '", "' + pokemonId1 + '")', function(error, results, fields) {
										if(error){
											console.error(error);
											res.json({ response: false });
										}
										else{
											//on supprime les pokemons échangés de la collection de leur utilisateur originel
											connection.query('DELETE FROM Collection_User WHERE id_ligne LIKE "' + idLignePkmnUser1 + '" OR id_ligne LIKE "' + idLignePkmnUser2 + '"', function(error, results, fields) {
												if(error){
													console.error(error);
													res.json({ response: false });
												}
												else{
													//on supprime les demandes d'échanges des 2 utilisateurs
													connection.query('DELETE FROM Requete_Echange WHERE login_user LIKE "' + loginUser1 + '" OR login_user LIKE "' + loginUser2 + '"', function(error, results, fields) {
														if(error){
															console.error(error);
															res.json({ response: false });
														}
														else{
															res.json({ response: true });//echange effectué avec succès
														}
													});
												}
											});
										}
									});

								}
							});
						}
					});
				}
				else {
					res.json({ response: false });
				}
			});
		}
		else {
			res.json({ response: false });
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
