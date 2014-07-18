var passport = require('passport'), 
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;

var User = require('../models/user'); // Clase  de la coleccion USERS en la base de datos

var twitterConnection = function (server) { // Cuando se abre una conexion con twitter
	console.log('twitterConnection ready');

	passport.use(
		new TwitterStrategy( // Se le pasan los token de permisos para la aplicacion dados en dev.twitter
		{
			consumerKey: 'EfAy4rYPasKXj7DIYA9NSA', 
			consumerSecret: 'pEqqmkQwO8Wer0R8CIkjKR3gq6N9fu6NhX1QHTSJPAo',
			callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
		},
		function (token, tokenSecret, profile, done) { // Una vez se inicio sesion con una cuenta de twitter
			
			// Instancia de la clase User , con el nombre de usuario y el perfil de la cuenta de twitter
			var user = new User({
				username : profile.username,
				twitter : profile
			});

            // Se guarda en la base de datos el objeto user
			user.save(function(err){
				
				if(err){
					done(err, null);
					return;
				}          
            });
		    
		    done(null, profile); // Guarda el profile en la sesion
		}
	));

	server.get('/auth/twitter',passport.authenticate('twitter')); // Cuando el cliente accede al inicio de sesion por twitter

	// Cuando se completa el inicio de sesion por twitter , se reedirige a la aplicacio

	server.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/app');
	});
};

module.exports = twitterConnection; // Se exporta el modulo de la conexion por twitter