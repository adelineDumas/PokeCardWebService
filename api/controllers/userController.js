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
};

exports.collection = function(req, res) {
  var loginUser = req.body.login; // POST
  //var loginUser = req.params.login; // GET

	connection.query('SELECT id_pokemon FROM Collection_User WHERE login_user LIKE "' + loginUser + '" ORDER BY id_pokemon', function(error, results, fields) {
		if(error){
			res.json({ response: false });
		}
		else if(results.length > 0) {

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
							var pkmnTmp = {
								"id_pokemon":results[i].id_pokemon,
								"name_pokemon": infoPokemon.pokemon_entries[results[i].id_pokemon-1].pokemon_species.name,
								"url_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+results[i].id_pokemon+".png"
							};
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
      	res.json([]);
		}
	});
};

exports.exchangereq = function(req, res) {
	var loginUser = req.body.login_user;
	//var loginUser = req.params.login_user;
	var pokemonId = req.body.id_pokemon;
	//var pokemonId = req.params.id_pokemon;
	var nomPokemon = req.body.nom_pokemon;
  //var nomPokemon = req.params.nom_pokemon;
	var url = req.body.url;
  //var url = req.params.url;

	if(nomPokemon){
		connection.query('INSERT INTO Requete_Echange VALUES (NULL,"' + loginUser + '", "' + pokemonId + '", "' + nomPokemon + '", "' + url + '")', function(error, results, fields) {
			if(error) {
				res.json({ response: false });
			}
		});
	}
	connection.query('SELECT login_user, id_pokemon, nom_pokemon, url FROM Requete_Echange WHERE login_user NOT LIKE "' + loginUser + '"', function(error, results, fields) {
		if(error){
			res.json({ response: false });//aucun résultat à cause d'une erreur
		}
		else if(results.length >= 1) {
			var data = [];
			for(var i=0;i<results.length;i++){
					var line = {
						"login_user": results[i].login_user,
						"id_pokemon": results[i].id_pokemon,
						"nom_pokemon": results[i].nom_pokemon,
						"url": results[i].url
					};
					data.push(line);
				}
			res.json(data);
		}
		else {
			res.json({ response: true });//aucun résultat car la seule demande d'échange est la notre
		}
	});
};

exports.exchangewith = function(req, res) {
	var loginUser1 = req.body.loginUser1; //POST
	//var loginUser1 = req.params.login1; //GET
	var loginUser2 = req.body.loginUser2; //POST
	//var loginUser2 = req.params.login2; //GET
	var pokemonId1 = req.body.idPokemon1; //POST
	//var pokemonId1 = req.params.idPokemon1; //GET
	var pokemonId2 = req.body.idPokemon2; //POST
	//var pokemonId2 = req.params.idPokemon2; //GET

	var idLignePkmnUser1, idLignePkmnUser2, idLigneReqEx1, idLigneReqEx2;

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
													//on récupère l'identifiant des lignes concernées par l'échange dans la table Requete_Echange
													connection.query('SELECT id_ligne FROM Requete_Echange WHERE login_user LIKE "' + loginUser1 + '" AND id_pokemon = "' + pokemonId1 + '" OR login_user LIKE "' + loginUser2 + '" AND id_pokemon = ' + pokemonId2, function(error, results, fields) {
														if(error){
															console.error(error);
															res.json({ response: false });
														}
														if(results.length > 0){
															idLigneReqEx1 = results[0].id_ligne;
															idLigneReqEx2 = results[1].id_ligne;

                              //on supprime les demandes d'échanges des 2 utilisateurs
                              connection.query('DELETE FROM Requete_Echange WHERE id_ligne = "' + idLigneReqEx1 + '" OR id_ligne =' + idLigneReqEx2, function(error, results, fields) {
                              	if(error){
                              		console.error(error);
                                	res.json({ response: false });
                              	}
                              	else{
																	//on ajoute 1 point aux 2 utilisateurs
		                              connection.query('UPDATE User SET points = points+1 WHERE login_user LIKE "' + loginUser1 + '" OR login_user LIKE "' + loginUser2 + '"', function(error, results, fields) {
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
														else{
                            	res.json({ response: false });
														}
													});
												}
											});
										}
									});
								}
								else{
                  res.json({ response: false });
								}
							});
						}
            else{
              res.json({ response: false });
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
};


exports.signup = function(req, res) {
	var loginUser = req.body.login;//POST
	//var loginUser = req.params.login;//GET
	var password = req.body.password;//POST
	//var password = req.params.password;//GET
	var mail = req.body.mail;//POST
	//var mail = req.params.mail;//GET

	connection.query('INSERT INTO User VALUES ("' + loginUser + '", "' + sha1(password) + '", "' + mail + '", 10)', function(error, results, fields) {
		if(error){
			res.json({ response: false });
		}
		else{
			res.json({ response: true });
		}
	});
}

exports.addfriend = function(req, res){
	var loginUser = req.body.login_user;//POST
	//var loginUser = req.params.login_user;//GET
	var loginFriend = req.body.login_friend;//POST
	//var loginFriend = req.params.login_friend;//GET

	connection.query('INSERT INTO Ami VALUES (NULL,"' + loginUser + '","' + loginFriend + '")', function(error, results, fields) {
		if(error){
			res.json({ response: false });
		}
		else{
			res.json({ response: true });
		}
	});
}

exports.searchuser = function(req, res){
	var stringUser = req.params.string_user;//GET
	var response = [];
	connection.query('SELECT login_user, mail, avatar FROM User WHERE login_user LIKE "%' + stringUser + '%"', function(error, results, fields) {
		if(error){
			res.json({response : false});
		}
		else if(results.length > 0){
			for(var i=0;i<results.length;i++){
				var responseTmp = {
					"login" : results[i].login_user,
					"mail" : results[i].mail,
					"avatar" : results[i].avatar,
				};
				response.push(responseTmp);
			}
			res.json(response);
		}
		else{
			res.json([]);
		}
	});
}

exports.randomuser = function(req, res){
	var response = [];
	var responseAll = [];
	connection.query('SELECT login_user, mail, avatar FROM User', function(error, results, fields) {
		if(error){
			res.json({response : false});
		}
		else if(results.length > 0){
			for(var i=0;i<results.length;i++){
				var userTmp = {
					"login" : results[i].login_user,
					"mail" : results[i].mail,
					"avatar" : results[i].avatar,
				};
				responseAll.push(userTmp);
			}
			if(responseAll.length <= 10){
				res.json(responseAll);
			}
			else{
				for(var i=0;i<10;i++){
					var min = Math.ceil(1);
					var max = Math.floor(responseAll.length);
					var userId = Math.floor(Math.random() * (max - min +1)) + min;
					response.push(responseAll[userId-1]);
					responseAll.splice(userId, 1);
				}
				res.json(response);
			}
		}
		else{
			res.json([]);
		}
	});
}

exports.friendslist = function(req, res){
	var loginUser = req.body.login;//POST
	//var loginUser = req.params.login_user;//GET

	connection.query('SELECT * FROM Ami WHERE login_user1 LIKE "' + loginUser + '" OR login_user2 LIKE "' + loginUser + '"', function(error, results, fields){
		if(error){
			res.json({response : false});
		}
		else if(results.length > 0){
			var response = [];
			var promiseArray = [];
			for(var i=0;i<results.length;i++){
				promiseArray.push(new Promise(function(resolve,reject){
					var loginFriend = (loginUser == results[i].login_user1) ? results[i].login_user2 : results[i].login_user1;
					connection.query('SELECT login_user, mail, avatar FROM User WHERE login_user LIKE "' + loginFriend + '"', function(error, results, fields) {
						if(error){
							res.json({response : false});
						}
						else{
							var responseTmp = {
									"login" : results[0].login_user,
									"mail" : results[0].mail,
									"avatar" : results[0].avatar,
							};
							resolve(responseTmp);
						}
					});
				}));
			}
			Promise.all(promiseArray).then(function(response){
				res.json(response);
			});
		}
		else{
			res.json([]);
		}
	});
}
