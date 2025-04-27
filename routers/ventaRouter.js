const express = require("express")
const router = express.Router()

const ventaController = require('../controller/ventaController')

router.get("/listarventa/", ventaController.getAllVenta)
router.get("/listardetalleventa/", ventaController.getAllDetalleVenta)
router.get("/buscaruorid/:text", ventaController.searchUsuarioOrIDVentaByText)

module.exports = router