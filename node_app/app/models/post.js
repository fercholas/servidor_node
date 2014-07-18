// Modelo de los Post

var models = require('./models'), // Se importa el modelo de la conexion a la base de datos
    Schema = models.Schema;       // Se importa el schema de la base datos
 var PostSchema = Schema({        // Se genera un nuevo schema con el contenido del post y el id del usuario que lo realizo
     
     content : 'string', // Contenido del Post string
     user : {
     	  type : Schema.Types.ObjectId,   // Id del usuario
     	  ref : 'user'
     }
 });   

 var Post = models.model('post',PostSchema); // Se crea el modelo

 module.exports = Post; // Se exporta el modelo