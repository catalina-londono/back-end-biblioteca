const dayjs = require('dayjs')
const { Schema, model } = require('mongoose')

const PrestamoSchema = Schema({
    fechaDevolucion : {
        type : Date,
    },
    fechaADevolver: {
        type : Date,
        // calcular con 15+ días
        default: dayjs().add(15, 'day')
    },
    fechaPrestamo : {
        type : Date,
        default: new Date(),
        required: true
    },
    ejemplar :{
        type: Schema.Types.ObjectId,
        ref: 'Ejemplar',
        required: true
    },
    usuario :{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    gestor : {
        type: Schema.Types.ObjectId,
        ref: 'Gestor',
        required: true
    },
    multa: {
        type: Number,
        // se actualiza todos los días a las 00:00
        default: 0
    },
    multaPagada: {
        type: Boolean,
        default : true        
    },
    gestorDevolucion : {
        type: Schema.Types.ObjectId,
        ref: 'Gestor'
    },
    gestorCobra : {
        type: Schema.Types.ObjectId,
        ref: 'Gestor'
    },
    fechaCobro : {
        type: Date
    }
})

module.exports = model('Prestamo', PrestamoSchema)