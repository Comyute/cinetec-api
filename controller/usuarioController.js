const pool = require('../database')
const { getAll } = require('./peliculaController')

const usuarioController = {
    getAll: async(req, res) =>{
        try {
            const { rows } = await pool.query('SELECT*FROM tb_usuario ORDER BY idusuario')
            res.json(rows)
        } catch (error) {
            res.json({
                msg: "ERROR usuarioController, " + error.msg
            })
        }
    },

    create: async(req, res) =>{
        try {
            const { nombres, apellidos, correo, contrasenia } = req.body
            const sql = 'INSERT INTO tb_usuario (nombres, apellidos, correo, contrasenia) VALUES ($1,$2,$3,$4) RETURNING *'
            const { rows } = await pool.query(sql, [nombres, apellidos, correo, contrasenia])
            res.json(rows[0])
        } catch (error) {
            res.json({
                msg: "ERROR usuarioController, " + error.msg
            })
        }
    },

    loginChecking: async(req, res) =>{
        try {
            const { correo, contrasenia } = req.body
            const sql = 'SELECT * FROM tb_usuario WHERE correo = $1 AND contrasenia = $2'
            const { rows } = await pool.query(sql, [correo, contrasenia])

            res.json(rows[0])
        } catch (error) {
            res.json({
                msg: "ERROR usuarioController, " + error.msg
            })
        }
    }
}

module.exports = usuarioController