const { Schema, model } = require('mongoose')


const EjemplarSchema = Schema({
    codigo : {
        type : String,
        required : [true, 'Ejemplar debe tener un codigo'],
        unique : [true, 'Codigo ejemplar ya existe']
    },
    localizacion : {
        type: Schema.Types.ObjectId,
        ref: 'Localizacion',
        required : true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required : true
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

module.exports = model('Ejemplar', EjemplarSchema)