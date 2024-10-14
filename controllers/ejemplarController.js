const {request, response} = require('express')
const Ejemplar = require('../models/ejemplar')
const Libro = require('../models/libro')
const Localizacion = require('../models/localizacion')

const crearEjemplar = async (req = request, res = response) => {
    try {
        // {
        //     "codigo" : " ",
        //     "localizacion": {
        //         "_id" : " "
        //     },
        //     "libro" : {
        //         "_id": " "
        //  }
        const {codigo, localizacion, libro} = req.body

        // Validaciones

        // que sea una localización válida
         const localizacionBD = await Localizacion.findById(localizacion._id)
         if (!localizacionBD) {
             return res.status(400).json({
                 msj: 'Localización no existe'
             })
         }

        // que sea un libro válido
        const libroBD = await Libro.findById(libro._id)
        if (!libroBD) {
            return res.status(400).json({
                msj: 'Libro no existe'
            })
        }

        data = {
            codigo : codigo,
            localizacion: localizacionBD,
            libro: libroBD
        }
        const ejemplar = new Ejemplar(data)
        await ejemplar.save()
       return res.status(201).json(ejemplar)
 } catch(e) {
    console.log(e)
    return res.status(500).json({e})
}
}

const consultarEjemplares = async (req = request, res = response) => {
    try {
        const ejemplares = await Ejemplar
        .find()
        .populate({
            path: "libro",
            select: '_id titulo'
          })
        return res.json(ejemplares)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const consultarEjemplarPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const ejemplar = await Ejemplar.findById(id)
        .populate('localizacion', 'seccion estanteria')  
        .populate('libro', 'titulo')

        if(!ejemplar){
            return res.status(404).json({msj: 'No existe ejemplar'})
        }
        return res.json(ejemplar)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const actualizarEjemplarPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {codigo, localizacion, libro} = req.body  // destructuring
        let data = {
            codigo: codigo,
            localizacion: localizacion,
            libro: libro
        }
        data.fechaActualizacion = new Date()
        const ejemplar = 
            await Ejemplar.findByIdAndUpdate(id, data, {new: true})
            .populate('localizacion', 'seccionestanteria')  
            .populate('libro', 'titulo')
        return res.status(201).json(ejemplar)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

module.exports = {
    crearEjemplar,
    consultarEjemplares,
    consultarEjemplarPorID,
    actualizarEjemplarPorID
}






