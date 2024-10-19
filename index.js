const express = require("express")
const app = express()
const cors = require("cors")
const peliculaRouter = require('./routers/peliculaRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/pelicula", peliculaRouter)

const PORT = 3000

app.listen(PORT, () =>{
    console.log("Server activo en el puerto", PORT)
})