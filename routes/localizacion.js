const {Router} = require('express')
const {crearLocalizacion,
    consultarLocalizaciones} =  require('../controllers/localizacionController')
const { validarToken } = require('../middlewares/validar-token')


const router = Router()

router.post('/', [validarToken], crearLocalizacion)
router.get('/', [validarToken], consultarLocalizaciones)

module.exports = router