const { Schema, model } = require('mongoose')

const GestorSchema = Schema({
    documento : {
        type : String,
        required : [true, 'Gestor debe tener un documento'],
        unique : [true, 'Documento gestor ya existe']
    },
    nombre : {
        type: String,
        required : [true, 'Gestor debe tener un nombre']
    },
    password : {
        type: String
    },
    enabled : {
        type: Boolean,
        default: true
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

module.exports = model('Gestor', GestorSchema)