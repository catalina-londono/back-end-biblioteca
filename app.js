const dotenv = require('dotenv') // importando dotenv
dotenv.config()

const express = require('express') // importando express
const app = express()
const cors = require('cors')
const {mongoConnect} = require('./databases/config')
mongoConnect()

// middlewares
app.use(cors({
    origin: '*',
    methods : ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'token', 'Authorization'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// rutas
const usuarios = require('./routes/usuario')
const gestores = require('./routes/gestor')
const prestamos = require("./routes/prestamo")
const localizaciones = require("./routes/localizacion")
const autores = require('./routes/autor')
const editoriales = require('./routes/editorial')
const libros = require('./routes/libro')
const ejemplares = require('./routes/ejemplar')
  
app.use('/api/v1/usuarios', usuarios) // endpoint
app.use('/api/v1/gestores', gestores) // endpoint
app.use('/api/v1/prestamos', prestamos) // endpoint
app.use('/api/v1/localizaciones', localizaciones) // endpoint
app.use('/api/v1/autores', autores) //endpoint
app.use('/api/v1/editoriales', editoriales) //endpoint
app.use('/api/v1/libros', libros) //endpoint
app.use('/api/v1/ejemplares', ejemplares) //endpoint

app.get('*',(req, res) => {
    return res.status(404).json({
        msj: 'No encontrado',
        status: 404
    })
}
)

module.exports = app

