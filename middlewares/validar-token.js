const { request, response } = require("express")
const jwt = require('jsonwebtoken')

const validarToken = (req = request, res = response, next) => {
    const token = req.header('token')
    if (!token) {
        return res.status(401).json({msj: "No tienes permisos"})
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        req.uid = uid
    }catch(e) {
        console.log(e)
        return res.status(401).json({msj: 'Token no válido'})
    }
    next()
   }

module.exports = {
    validarToken
}