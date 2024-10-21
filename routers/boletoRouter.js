const express = require("express")
const router = express.Router()

const boletoController = require('../controller/boletoController')

router.get("/listar/", boletoController.getAll)
router.post("/registrar/", boletoController.create)
router.post("/comprarboleto/", boletoController.compraBoleto)
router.get("/buscarcompras/:id", boletoController.searchComprasByUser)

module.exports = router