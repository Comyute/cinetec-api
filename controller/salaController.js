const pool = require('../database')

const salaController = {
    getAll: async ( req, res) =>{
        try {
            const { rows } = await pool.query('SELECT*FROM tb_sala ORDER BY idsala')
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR salaController: " + error.message
            });
        }
    },

    create: async( req, res ) =>{
        try {
            const { idsala, disponibilidad } = req.body
            const sql = 'INSERT INTO tb_sala (idsala, disponibilidad) VALUES ($1,$2) RETURNING *'
            const { rows } = await pool.query(sql, [idsala, disponibilidad])
            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR salaController: " + error.message
            });
        }
    }

}

module.exports = salaController