const express = require("express")
const router = express.Router()

const usuarioController = require('../controller/usuarioController')

router.get("/listar/", usuarioController.getAll)
router.post("/registrar/", usuarioController.create)
router.post("/loginchecking/", usuarioController.loginChecking)

module.exports = router