const express = require("express")
const router = express.Router()

const peliculaController = require('../controller/peliculaController')

router.get("/listar/", peliculaController.getAll)

router.get("/buscar/:id", peliculaController.getById)
router.get("/buscarpelicula/:text", peliculaController.searchByText)

module.exports = router