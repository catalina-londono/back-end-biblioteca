const {request, response} = require('express')
const Usuario = require('../models/usuario') // se importa modelo Usuario


// crear usuario
const crearUsuario= async (req = request, res = response) => {
    try {
        const body = req.body
        const usuario = new Usuario(body)
        await usuario.save()
        return res.status(201).json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

// consultar usuarios
const consultarUsuarios = async (req = request, res = response) => {
    try {
        const usuarios = await Usuario.find()
        return res.json(usuarios)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

// consultar un usuario
const consultarUsuarioPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const usuario = await Usuario.findById(id)
        if(!usuario){
            return res.status(404).json({msj: 'No existe usuario'})
        }
        return res.json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

// actualizar o editar un usuario
const actualizarUsuario = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {nombre, telefono, direccion} = req.body  // destructuring
        let data = {
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
        }
        data.fechaActualizacion = new Date()
        const usuario = 
            await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

// deshabilitar usuario ---> delete lógico
const deshabilitarUsuarioPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled: false
        } 
        data.fechaActualizacion = new Date()
        const usuario = 
            await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

module.exports = {
    crearUsuario,
    consultarUsuarios,
    consultarUsuarioPorID,
    actualizarUsuario,
    deshabilitarUsuarioPorID
}