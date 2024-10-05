const {Router} = require('express')
const {crearLibro,
    consultarLibros,
    consultarLibroPorID,
    actualizarLibroPorID
} =  require('../controllers/libroController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken], crearLibro)
router.get('/', [validarToken], consultarLibros)
router.get('/:id', [validarToken], consultarLibroPorID)
router.put('/:id', [validarToken], actualizarLibroPorID)

module.exports = router