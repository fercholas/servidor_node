var models = require('./models'), // Se importa el modelo de la conexion a la base de dato
    Schema = models.Schema;        // Se importa el schema de la base datos

var userSchema = Schema({          // Se genera un nuevo schema el nombre de usuario que se conecta y el perfil del usario
    username : 'string',
    twitter  : Schema.Types.Mixed
}); 

var User = models.model('user',userSchema); // Se genera el modelo de USER

module.exports = User; // Se exporta el modelo 