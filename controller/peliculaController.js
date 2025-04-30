const pool = require('../database')

const peliculaController = {
    getAll: async(req, res) =>{
        try {
            const sql = 'SELECT * FROM tb_pelicula ORDER BY idpelicula'
            const { rows } = await pool.query(sql)
            res.json(rows)
        } catch (error) {
            res.json({
                msg: "ERROR peliculaController, " + error.msg
            })
        }
    },

    getById: async(req,res) =>{
        try {
            const { rows } = await pool.query('SELECT * FROM tb_pelicula WHERE idpelicula = $1', [req.params.id])
            res.json(rows[0])
        } catch (error) {
            res.json({
                msg: "ERROR peliculaController, " + error.msg
            })
        }
    },

    searchByText: async(req, res) =>{
        try {
            const searchText = `${req.params.text}%`
            const { rows } = await pool.query('SELECT * FROM tb_pelicula WHERE nombre ILIKE $1', [searchText])
            res.json(rows)
        } catch (error) {
            res.json({
                msg: "ERROR peliculaController, " + error.msg
            })
        }
    },

    create: async(req, res) =>{
        try {
            const { idpelicula, nombre, descripcion, generos, restriccion, linkPortada } = req.body
            const sql = 'INSERT INTO tb_pelicula(idpelicula, nombre, descripcion, generos, restriccion, linkPortada) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *'
            const { rows } = await pool.query(sql, [idpelicula, nombre, descripcion, generos, restriccion, linkPortada])
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR peliculaController: " + error.message
            });
        }
    }
}

module.exports = peliculaController