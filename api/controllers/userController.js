'use strict';
var https = require('https');
var mysql = require('mysql');
var sha1 = require('sha1');
//var routes = require('../../global.js');

/*var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'PokeCard'
});

connection.connect();*/

/*exports.verifylogin = function(req, res) {
	var loginUser = req.body.login;
	var password = req.body.password;

	/*connection.query('SELECT * FROM User WHERE password LIKE "' + password + '"', function(error, results, fields) {
		if(results) {
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
}*/

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
