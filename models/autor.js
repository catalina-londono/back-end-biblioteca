const { Schema, model } = require('mongoose') //importación de clase Schema y método model. Se importan desde mongoose

const AutorSchema = Schema({
    codigo : {
        type : Number,
        required : [true, 'Autor debe tener un codigo'],
        unique : [true, 'Codigo autor ya existe']
    },
    nombre : {
        type: String,
        required : [true, 'Autor debe tener un nombre']
    },
    descripcion : {
        type: String
    },
    // relacion muchos-muchos (no necesito otra colección intermedia)
   libros: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Libro'
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

module.exports = model('Autor', AutorSchema) // Exporta y define modelo para colección autores