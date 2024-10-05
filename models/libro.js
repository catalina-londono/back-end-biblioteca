const { Schema, model } = require('mongoose')

const LibroSchema = Schema({
    codigo : {
        type : String,
        required : [true, 'Libro debe tener un codigo'],
        unique : [true, 'Codigo libro ya existe']
    },
    titulo : {
        type: String,
        required : [true, 'Libro debe tener un titulo']
    },
    ISBN : {
        type: String,
        required : [true, 'Libro debe tener un ISBN'],
        unique : [true, 'ISBN libro ya existe']
    },
    editorial :{
        type: Schema.Types.ObjectId,
        ref: 'Editorial'
    },
    paginas : {
        type: Number
    },
    // relacion muchos-muchos (no necesito otra colección intermedia)
    autores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Autor'
        }
    ],
        // datos de auditoria
    fechaCreacion : {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date
    },

})

module.exports = model('Libro', LibroSchema)