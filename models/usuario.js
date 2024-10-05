const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    codigo : {
        type : String,
        required : [true, 'Usuario debe tener un codigo'],
        unique : [true, 'Codigo usuario ya existe']
    },
    nombre : {
        type: String,
        required : [true, 'Usuario debe tener un nombre']
    },
    telefono : {
        type: String
    },
    direccion :{
        type: String
        },
    enabled: {
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

module.exports = model('Usuario', UsuarioSchema)