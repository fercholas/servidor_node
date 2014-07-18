
/// 	Configuracion del Servidor //////

var express = require('express.io'), // Modulo de node js para implementacion de servidores web con sockets io
	swig = require('swig'),  // Sistema de vistas compatible con express
	_ = require('underscore'), // Modulo de node para el manejo de Arreglos en javascript
    passport = require('passport'); // Modulo que penmite inicio de sesiones con facebook , twitter ,.. etc


var RedisStore = require('connect-redis')(express); 

var server = express(); // Server express
server.http().io(); // Configuracion  del server con socket io
var users = [];

// Configuracion para renderear vistas
server.engine('html', swig.renderFile); // Se van a renderizar vistal html
server.set('view engine', 'html');
server.set('views', '/home/nicolas/Documentos/servidores_node_js/app/views'); // Path donde están las vistas

// Carga archivos estaticos
server.use(express.static('/home/nicolas/Documentos/servidores_node_js/public')); //Este permite el envío de archivos estáticos desde el servidor, como css, javascripts, imágenes, etc

// Agregamos post, cookie y sessiones
server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser()); // Middlewares ...Con esta linea de código decimos que antes de que llegue el mensaje enviado desde el cliente hasta nuestra ruta, sea analizado el contenido del body para poder ser utilizado.
	server.use(express.session({
		secret : "lolcatz",
		store  : new RedisStore({})
		// store  : new RedisStore({
		//	host : conf.redis.host,
		//	port : conf.redis.port,
		//	user : conf.redis.user,
		//	pass : conf.redis.pass
		// });	
	}));

	server.use(passport.initialize()); // Configuracion del server para usar inicio de sesiones con passport (twitter , facebook)
	server.use(passport.session()); // Inicio de sesiones con passport
});

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

/// Controllers , 

var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');
homeController(server,users);
appController(server,users);

//Connections

var twitterConnection = require('./app/connections/twitter');
twitterConnection(server);

// 	Puerto del servidor 
server.listen(3000);