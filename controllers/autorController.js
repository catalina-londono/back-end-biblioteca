const {request, response} = require('express')
const Autor = require('../models/autor')

const crearAutor = async (req = request, res = response) => {
    try{
        const body = req.body
        const autor = new Autor(body)
        await autor.save()
        return res.status(201).json(autor)
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
    })
    }
}

const consultarAutores = async (req = request, res = response) => {
    try {
        const autores = await Autor.find()
        return res.json(autores)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const consultarAutorPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            return res.status(404).json({msj: 'No existe autor'})
        }
        return res.json(autor)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const actualizarAutorPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {codigo, nombre, descripcion} = req.body  // destructuring
        let data = {
            codigo: codigo,
            nombre: nombre,
            descripcion: descripcion,
        }
        data.fechaActualizacion = new Date()
        const autor = 
            await Autor.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(autor)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

module.exports = {
crearAutor,
consultarAutores,
consultarAutorPorID,
actualizarAutorPorID
}