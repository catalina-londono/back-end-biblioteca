const jwt = require('jsonwebtoken')

const generarToken = (id) => { // Es una función que recibe como argumento un identificador (id). Este id es el identificador del usuario en la base de datos que se incluirá en el token para representar al usuario.
    
    return new Promise((resolve, reject) => {
        const payload = {uid: id} // el payload es un objeto con una clave uid que tiene como valor el id del usuario. Este id será utilizado en futuras solicitudes para identificar al usuario autenticado.
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, (err, token) =>{
            if (err){
                reject('Error al generar token')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarToken
}
