const {request, response} = require('express')
const Prestamo = require('../models/prestamo')
const Usuario = require('../models/usuario')
const Ejemplar = require('../models/ejemplar')
const Gestor = require('../models/gestor')
const schedule = require('node-schedule')
const dayjs = require('dayjs')

// El propósito de las siguientes líneas es actualizar las multas de los préstamos
//que no han sido devueltos en la fecha establecida.
const job = schedule.scheduleJob(process.env.CRON, async ()=> { //programa una tarea que se ejecuta en los intervalos de tiempo definidos por una expresión cron. La función asíncrona se ejecutará cuando el trabajo programado se dispare.
    console.log('Actualizando multas')
    let prestamos = []
    prestamos = await Prestamo.find({ fechaDevolucion: null}) // se hace una consulta a la base de datos para obtener todos los préstamos que aún no han sido devueltos, es decir, aquellos en los que la propiedad fechaDevolucion es null.
    const hoy = new Date()    // Se guarda la fecha actual en la variable hoy para poder comparar si el préstamo ha sobrepasado la fecha límite de devolución.
    prestamos.forEach(async (prestamo) => { // Se recorre cada préstamo no devuelto utilizando forEach
        let multa = prestamo.multa
        let multaPagada = prestamo.multaPagada
        if(prestamo.fechaADevolver < hoy) {
            
            const dias = dayjs().diff(prestamo.fechaADevolver, 'day') // Se utiliza la biblioteca dayjs para calcular cuántos días han pasado desde la fecha límite de devolución.
            multa = dias*Number(process.env.MULTA_POR_DIA) // e calcula la multa multiplicando el número de días de retraso por el valor de la multa diaria
            multaPagada = false // Se marca la multa como no pagada, ya que el préstamo está atrasado.
        }
        // Actualización de los cambios en la base de datos:
        const cambios = { // Se crea un objeto cambios que contiene las actualizaciones para el préstamo
            multa,
            multaPagada
        }
        await Prestamo.findByIdAndUpdate(prestamo._id, cambios) // Se actualiza el préstamo en la base de datos, buscando el préstamo por su ID (prestamo._id) y aplicando los cambios calculados.
        })
     })
    
    
const prestarEjemplar = async (req = request, res = response) => {
    try {
         /**
         * {
         *  "ejemplar": {
         *      "_id": "dadadadadasd"
         *  },
         *  "usuario" : {
         *      "_id": "dadasdad"
         *  } 
         * }
         */
        const {ejemplar, usuario} = req.body
        const uid = req.uid
        //console.log(uid)
        
        // validaciones
        
        //  que sea un usuario válido
        const usuarioBD = await Usuario.findById(usuario._id)
        if(!usuarioBD) {
            return res.status(400).json({
                msj: 'Usuario no existe'
            })
        }
       
        // que sea un ejemplar válido
        const ejemplarBD = await Ejemplar.findById(ejemplar._id)
        if(!ejemplarBD) {
            return res.status(400).json({
                msj: 'Ejemplar no existe'
            })
        }

        //  gestor válido
        const gestorBD = await Gestor.findOne({documento : uid})
        if(!gestorBD) {
            return res.status(400).json({
                msj: 'Gestor no existe'
            })
        }

        // que el ejemplar no esté prestado
        const prestamoPorEjemplar = await Prestamo.find({
            $and : [
                { ejemplar : ejemplarBD },
                { fechaDevolucion : null }
            ]
        })

        if(prestamoPorEjemplar && prestamoPorEjemplar.length > 0) {
            return res.status(400).json({
                msj: 'Este ejemplar ha sido prestado'
            })
        }

       // Que la persona no pase limite de prestamos
       let prestamosDBporUsuario = []
       prestamosDBporUsuario = await Prestamo.find({
        usuario: usuarioBD
       })
       const prestamosNoDevueltos = 
        prestamosDBporUsuario.filter(prest => !prest.fechaDevolucion)

       const cantidadNoDevueltos = prestamosNoDevueltos.length

       if (cantidadNoDevueltos >= process.env.PRESTAMOS_MAX_SIMULTANEOS) {
        return res.status(400).json({
            msj: 'El usuario ya tiene el máximo de préstamos simultáneos'
        })
       }     

       // que no tenga multas
       const prestamosConMultas = 
        prestamosDBporUsuario.filter(prest => (!prest.multaPagada && prest.multa > 0))
       const cantConMultas = prestamosConMultas.length
       if (cantConMultas >0) {
        return res.status(400).json({
            msj: 'El usuario tiene una multa, no se le puede prestar'
        })
       }  

        // horario: hora inicial y final
        const hoy = new Date()
        const horaActual = hoy.getHours()
        if(horaActual < process.env.HORA_INICIAL_PRESTAMOS 
            || horaActual > process.env.HORA_FINAL_PRESTAMOS)
        {
            return res.status(400).json({
                msj: 'Está fuera del horario de préstamos'
            })
        }
        data = {
            ejemplar: ejemplarBD,
            usuario: usuarioBD,
            gestor : {
                _id : gestorBD._id} 
        }
       const prestamo = new Prestamo(data)
       await prestamo.save()
       return res.status(201).json(prestamo)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

const devolverEjemplar =  async (req = request, res = response) => {
    try {
        const uid = req.uid
        const id = req.params.id
        const gestorBD = await Gestor.findOne({documento : uid})
        if(!gestorBD) {
            return res.status(400).json({
                msj: 'Gestor no existe'
            })
        }
        let data = {
            gestorDevolucion: gestorBD
        }
        data.fechaDevolucion = new Date() // acá se le asigna un valor que determina si está prestado o no

        const prestamo = 
            await Prestamo.findByIdAndUpdate(id, data, {new : true})
        return res.status(201).json(prestamo)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }

}

const cobrarMulta = async (req = request, res = response) => {
    try {
        const uid = req.uid
        const id = req.params.id
        const gestorBD = await Gestor.findOne({documento : uid})
        if(!gestorBD) {
            return res.status(400).json({
                msj: 'Gestor no existe'
            })
        }

        let data = {
            gestorCobra: gestorBD
        }

        data.multaPagada = true
        data.fechaCobro = new Date()
        const prestamo = 
            await Prestamo.findByIdAndUpdate(id, data, {new : true})
        return res.status(201).json(prestamo)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}
const consultarPrestamos = async (req = request, res = response) => {
    try {
        const prestamos = await Prestamo.find()
         return res.json(prestamos)
       } catch(e) {
          console.log(e)
          return res.status(500).json({e})
      }
  }

const consultarPrestamosPorUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const usuarioBD = await Usuario.findById(id)
        if(!usuarioBD) {
         return res.status(400).json({
             msj: 'Usuario no existe'
         })
        }
        const prestamos = await Prestamo.find({usuario: usuarioBD})
        return res.json(prestamos)
     } catch(e) {
         console.log(e)
         return res.status(500).json({e})
     } 
}

const consultarPrestamosPorUsuarioYEstado = 
    async (req = request, res = response) => {
    try {
       const { id, estado } = req.params
       const usuarioBD = await Usuario.findById(id)
       const fechaDevolucion = 
        (estado === 'activo') ? { $ne : null } : null // op. ternario
       if(!usuarioBD) {
        return res.status(400).json({
            msj: 'Usuario no existe'
        })
       }
       const prestamos = await Prestamo.find({
            usuario : usuarioBD,
            fechaDevolucion
        })
       return res.json(prestamos)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    } 
}


module.exports = {
    prestarEjemplar,
    devolverEjemplar,
    cobrarMulta,
    consultarPrestamos,
    consultarPrestamosPorUsuario,
    consultarPrestamosPorUsuarioYEstado
}