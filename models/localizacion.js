const { Schema, model } = require('mongoose')


const LocalizacionSchema = new Schema({
    seccion : {
        type : Number,
        required : [true, 'Seccion debe asignarse']
    },
   estanteria : {
        type: Number,
        required : [true, 'Estanteria debe asignarse']
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

LocalizacionSchema.index({seccion: 1, estanteria: 1}, {unique: true})

module.exports = model('Localizacion', LocalizacionSchema)