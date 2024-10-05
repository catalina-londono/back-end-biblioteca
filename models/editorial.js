const { Schema, model } = require('mongoose')


const EditorialSchema = Schema({
    nombre : {
        type : String,
        required : [true, 'Editorial debe tener un nombre']
    },
   descripcion : {
        type: String,
    },
    // datos de auditoria
    fechaCreacion : {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date
    },

})

module.exports = model('Editorial', EditorialSchema)