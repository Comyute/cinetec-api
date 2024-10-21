const express = require("express")
const app = express()
const cors = require("cors")
const peliculaRouter = require('./routers/peliculaRouter')
const usuarioRouter = require('./routers/usuarioRouter')
const boletoRouter = require('./routers/boletoRouter')
const adminUsuarioRouter = require('./routers/adminUsuarioRouter')
const ventaRouter = require('./routers/ventaRouter')
const salaRouter = require('./routers/salaRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/pelicula", peliculaRouter)
app.use("/usuario", usuarioRouter)
app.use("/boleto", boletoRouter)
app.use("/admin", adminUsuarioRouter)
app.use("/venta", ventaRouter)
app.use("/sala", salaRouter)

const PORT = 3000

app.listen(PORT, () =>{
    console.log("Server activo en el puerto", PORT)
})