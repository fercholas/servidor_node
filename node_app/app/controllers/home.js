// Controlador del home

var _ = require('underscore'); // Modulo de manejo de arreglos

var homeController = function (server, users) {
    
    console.log('Estoy cargando el controllador llamado homeController')

    var inLoggedIn = function (req, res, next) { // Middleware que verifica si el usuario ya está loggeado
		
		if(req.session.passport.user){ // Si ya está loggeado lo dirige a la aplicacion
			res.redirect('/app');
			return;
		}

		next();
	};


    server.get('/', inLoggedIn, function (req,res) { // Cuando el  cliente hace un GET a home
		res.render('home'); // Se renderiza la vista de home
	});
			

	server.get('/log-out', function (req,res) {  // Cuando el usuario se desloggea
		users = _.without(users, req.session.user); // Por medio de underscore se recorre el arreglo de usuario conectado y se elimina el que quiere desloggearse
		server.io.broadcast('log-out',{username : req.session.user}); // Se le envia por socket io a los demas usuario el nuevo arreglo de usuarios coenctados
		req.session.destroy(); // Se destruyec las variables de sesion
		res.redirect('/'); // Se envia a home
	});

	server.post('/log-in',function (req,res) {  // Cuando el usuario se loggea
		users.push(req.body.Usuario); // Se guarda el usuario en el arreglo de usuarios conectados
		req.session.user = req.body.Usuario; // Se guarda como variable de sesion el nombre de usuario
		server.io.broadcast('log-in',{username : req.session.user}); // Se le envia por medio de socket el arreglo de usarios conectados a todos los usuarios
		res.redirect('/app'); // Se envia a app
	});

};

module.exports = homeController; // Se exporta el controlador de home