const {Router} = require('express')
const {crearEditorial,
    consultarEditoriales,
    consultarEditorialPorID,
    actualizarEditorialPorID} =  require('../controllers/editorialController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken], crearEditorial)
router.get('/', [validarToken],  consultarEditoriales)
router.get('/:id',[validarToken],consultarEditorialPorID)
router.put('/:id',[validarToken], actualizarEditorialPorID)


module.exports = router