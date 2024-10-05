const {Router} = require('express')
const {
    prestarEjemplar,
    consultarPrestamos,
    devolverEjemplar,
    cobrarMulta,
    consultarPrestamosPorUsuario,
    consultarPrestamosPorUsuarioYEstado
} =  require('../controllers/prestamoController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken], prestarEjemplar)
router.get('/', [validarToken], consultarPrestamos)
router.put('/:id', [validarToken], devolverEjemplar)
router.put('/cobrar/:id', [validarToken], cobrarMulta)
router.get('/:id/usuarios', [validarToken], consultarPrestamosPorUsuario)
router.get('/:id/usuarios/:estado', [validarToken], consultarPrestamosPorUsuarioYEstado)



module.exports = router