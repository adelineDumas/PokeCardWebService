'use strict';
var https = require('https');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;


/*var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'pokecard'
});*/

//connection.connect();

exports.init = function(req, res) {
	var userId = req.params.userId;

	//connection.connect();

	var response = {};

	/*connection.query('SELECT * FROM User WHERE idUser =' + userId, function(error, results, fields) {
		response = results[0];

		res.json(response);
	});*/
}

exports.login = function(req, res) {
	var mail = req.body.mail;
	var password = req.body.password;

	var response = {};

	/*connection.query('SELECT * FROM User WHERE mail LIKE "' + mail + '"', function(error, results, fields) {
		if(results) {
			if(bcrypt.compareSync(password, results[0].password)) {
				res.json(results[0]);
			} else {
				res.json({ password: false });
			}
		} else {
			res.json({ user: false });
		}
	});*/
}

exports.signup = function(req, res) {
	var mail = req.body.mail;
	var password = req.body.password;
	password = bcrypt.hashSync(password);

	var response = {};

	/*connection.query('INSERT INTO User (mail, password) VALUES ("' + mail + '", "' + password + '")', function(error, results, fiels) {
		console.log(results);
		res.json({ok: "ok"});
	});*/
}

exports.verify = function(req, res){
	var mail = req.body.mail;
	var password = req.body.password;

	/*connection.query('SELECT * FROM User WHERE mail LIKE "' + mail + '"', function(error, results, fields) {
		if(results) {
			res.json(results[0]);
		} else {
			connection.query('INSERT INTO User (mail, password) VALUES ("' + mail + '", "' + password + '")', function(error, results, fiels) {
				connection.query('SELECT * FROM User WHERE mail LIKE "' + mail + '"', function(error, results, fields) {
					if(results) {
						res.json(results[0]);
					}
				});
			});
		};
	});*/
}