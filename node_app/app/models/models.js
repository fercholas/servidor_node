var mongoose = require('mongoose'); // Se importa mongoose para la conexion a la base de datos

mongoose.connect('mongodb://localhost/' + 'backendPro'); // Se conecta con la base de datos BackendPron

module.exports = mongoose; //Se exporta el modelo
