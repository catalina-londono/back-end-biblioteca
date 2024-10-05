const {request, response} = require('express')
const Editorial = require('../models/editorial')

const crearEditorial = async (req = request, res = response) => {
    try{
        const body = req.body
        const editorial = new Editorial(body)
        await editorial.save()
        return res.status(201).json(editorial)
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
    })
    }
}

const consultarEditoriales = async (req = request, res = response) => {
    try {
        const editoriales = await Editorial.find()
        return res.json(editoriales)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const consultarEditorialPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const editorial = await Editorial.findById(id)
        if(!editorial){
            return res.status(404).json({msj: 'No existe editorial'})
        }
        return res.json(editorial)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const actualizarEditorialPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {nombre, descripcion} = req.body  // destructuring
        let data = {
            nombre: nombre,
            descripcion: descripcion,
        }
        data.fechaActualizacion = new Date()
        const autor = 
            await Editorial.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(autor)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

module.exports = {
    crearEditorial,
    consultarEditoriales,
    consultarEditorialPorID,
    actualizarEditorialPorID
}
