
/// Controlador de app

var User = require('../models/user'), // Clase User de la base de datos
    Post = require('../models/post'), // Clase Post de la base de datos
    _    = require('underscore');     // Se importa underscore para recorrer arreglos

var appController = function (server,users){

    console.log('Appcontroller está cargada')
    
    var isntLoggedIn = function (req, res, next) { // Middleware que verifica si el usuario ya está loggeado
		

		if(!req.session.passport.user){ // Si no está logeado lo lleva a home
			res.redirect('/');
			return;
		}

		next();
	};

    var getUser = function (req,res,next){ // Middleware que busca en la base de datos el usuario Niko_Fernandez1 y lo captura

        User.findOne({username: req.session.passport.user.username},function(err,user){       	
        	req.user = user;
        	next();
        });   	
    };

    server.get('/app', isntLoggedIn, function (req,res) { // Cuando el cliente accede a app

        Post.find({}) // Query que obtiene todos los posts que ha hecho el usuario 
        .populate('user')
        .exec(function(err,posts){ // Se ejecuta el query
             
            var postsAsJson = _.map(posts,function(post){ // Mediante underscore recorremos el arreglo de post y lo pasamos a formato json para enviarlo a la vista
                  return post.toJSON();
             });
            
            res.render('app', {   // Se reenderiza la vista y se le pasa como parámetros , el usuario loggeado con twitter , la lista de todos los usuario loggeados a la app , y todos los posts
                user  : req.session.passport.user,
                users : users,
                posts : postsAsJson         
             });
        });

    });

    server.post('/app/create-post', isntLoggedIn, getUser , function (req,res) { // Cuando el usuario hace un post

        var post = new Post({     // Se instancia el modelo Post con el contenido del post y el id del usuario Niko       
            content : req.body.content,
            user : req.user  
        });         
        post.save(function(err){    // Se guarda en la base de datos el post    	
        	if(err){
        		res.send(500,err);        		
        	}
 
            server.io.broadcast('post',{ // Se le envia a todos los usuario el post con el usuario que lo puso

                 content : post.content,
                 user: req.user.toJSON()

            }) 
            res.redirect("/app");   // Se dirige a la aplicacion      
        });        
        
    });
}

module.exports = appController; // Se exporta el controllador app