const {request, response} = require('express')
const Libro = require('../models/libro')
const Autor = require('../models/autor')
const Editorial = require('../models/editorial')


const crearLibro = async (req = request, res = response) => {
 try {
    // {
        // "codigo" : " ",
        // "titulo" : " " ,
        // "ISBN" : " ",
        // "editorial" : {
        //     "_id" : " "
        // },
        // "autores": [
        // {
        //     "_id" : " "
        // },
        // {
        //     "_id" : " "
        // }
        // ],
        // "paginas": ,
        const {codigo, titulo, ISBN, editorial, autores, paginas} = req.body
        
        // validaciones

        // que sea una editorial válida
        const editorialBD = await Editorial.findById(editorial._id)
        if(!editorialBD) {
            return res.status(400).json({
                msj: 'Editorial no existe'
            })
        }

        // que sea un autor válido
       // Validación de los autores
        const autoresBD = []
        for (const autor of autores) {
        const autorBD = await Autor.findById(autor._id)
        if(!autorBD) {
        return res.status(400).json({
          msj: `El autor con id ${autor._id} no existe`
        })
    }
      autoresBD.push(autorBD)
    }
        data = {
            codigo : codigo,
            titulo: titulo,
            ISBN: ISBN,
            editorial: editorialBD,
            autores: autoresBD,
            paginas: paginas
        }
        const libro = new Libro(data)
       await libro.save()
       return res.status(201).json(libro)
 } catch(e) {
    console.log(e)
    return res.status(500).json({e})
}
}

const consultarLibros = async (req = request, res = response) => {
    try {
        const libros = await Libro.find()
        return res.json(libros)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const consultarLibroPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const libro = await Libro.findById(id)
        .populate('editorial', 'nombre')  
        .populate('autores', 'nombre')

        if(!libro){
            return res.status(404).json({msj: 'No existe libro'})
        }
        return res.json(libro)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

const actualizarLibroPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {codigo, titulo, ISBN, editorial, paginas, autores} = req.body  // destructuring
        let data = {
            codigo: codigo,
            titulo: titulo,
            ISBN: ISBN,
            editorial: editorial,
            paginas: paginas,
            autores: autores
        }
        data.fechaActualizacion = new Date()
        const libro = 
            await Libro.findByIdAndUpdate(id, data, {new: true})
            .populate('editorial', 'nombre')  
            .populate('autores', 'nombre')
        return res.status(201).json(libro)
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            msj: 'Ocurrió un error'
        })
    }
}

module.exports = {crearLibro,
    consultarLibros,
    consultarLibroPorID,
    actualizarLibroPorID
}

