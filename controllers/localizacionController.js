const {request, response} = require('express')
const Localizacion = require('../models/localizacion')


const crearLocalizacion = async (req = request, res = response) => {
    try{
        const body = req.body
        const localizacion = new Localizacion(body)
        await localizacion.save()
        return res.status(201).json(localizacion)
    }catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

const consultarLocalizaciones = async (req = request, res = response) => {
    try {
        const localizaciones = await Localizacion.find()
        return res.json(localizaciones)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


module.exports = {
    crearLocalizacion,
    consultarLocalizaciones}