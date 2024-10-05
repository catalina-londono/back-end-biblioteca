const {Router} = require('express')
const {crearEjemplar,
    consultarEjemplares,
    consultarEjemplarPorID,
    actualizarEjemplarPorID
} =  require('../controllers/ejemplarController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken], crearEjemplar)
router.get('/', [validarToken], consultarEjemplares)
router.get('/:id', [validarToken], consultarEjemplarPorID)
router.put('/:id', [validarToken], actualizarEjemplarPorID)

module.exports = router