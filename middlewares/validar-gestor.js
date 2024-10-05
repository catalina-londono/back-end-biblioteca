const validarGestor = (req = request, res = response, next) => {
    const secret = req.header('secret')
    if (!secret) {
        return res.status(401).json({msj: "No tienes permisos"})
    }
    if(secret !== process.env.SECRET_GESTOR){
        return res.status(401).json({msj: "Secret incorrecto!"})
    }
    next()   
}

module.exports = {
    validarGestor
}