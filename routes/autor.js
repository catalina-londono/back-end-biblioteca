const {Router} = require('express')
const {crearAutor,
    consultarAutores,
    consultarAutorPorID,
    actualizarAutorPorID} =  require('../controllers/autorController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken], crearAutor)
router.get('/', [validarToken], consultarAutores)
router.get('/:id',[validarToken],consultarAutorPorID)
router.put('/:id',[validarToken], actualizarAutorPorID)


module.exports = router