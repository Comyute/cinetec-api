const express = require("express")
const router = express.Router()

const usuarioController = require('../controller/usuarioController')

router.get("/listar/", usuarioController.getAll)
router.post("/registrar/", usuarioController.create)
router.post("/loginchecking/", usuarioController.loginChecking)
router.get("/buscarusuario/:id", usuarioController.searchById)
router.get("/ultimaventa/:id",usuarioController.getLastVentaById)
router.delete("/eliminar/:id",usuarioController.deleteById)
router.put("/editarusuario/", usuarioController.updateById)
router.put("/deshabilitar/:id", usuarioController.disableUser)
router.get("/buscar/:id", usuarioController.findById)
router.get("/registraradmin/",usuarioController.createAdmin)
router.get("/listaradmin/", usuarioController.getAllAdmins)

module.exports = router