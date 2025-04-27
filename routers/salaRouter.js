const express = require("express")
const router = express.Router()

const salaController = require('../controller/salaController')

router.get("/listar/", salaController.getAll)
router.post("/registrar/", salaController.create)

module.exports = router