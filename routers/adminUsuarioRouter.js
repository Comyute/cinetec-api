const express = require("express")
const router = express.Router()

const adminUsuarioController = require('../controller/adminUsuarioController')

router.get("/listar/", adminUsuarioController.getAll)
router.post("/registrar/", adminUsuarioController.create)
router.post("/loginchecking/", adminUsuarioController.loginChecking)

module.exports = router