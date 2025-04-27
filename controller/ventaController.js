const pool = require('../database')

const ventaController = {
    getAllVenta: async(req, res) =>{
        try {
            const sql = `
            SELECT v.idventa, u.idusuario, u.nombres, u.apellidos, u.correo, dv.idboleto, TO_CHAR(v.fecha, 'DD-MM-YYYY') AS fecha, dv.cantidad, dv.preunitario::float
            FROM tb_usuario u
            JOIN tb_venta v
            ON u.idusuario = v.idusuario
            JOIN tb_detalleventa dv
            ON v.idventa = dv.idventa
            ORDER BY v.idventa DESC
            `
            const { rows } = await pool.query(sql)
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR ventaController: " + error.message
            });
        }
    },

    getAllDetalleVenta: async(req, res) =>{
        try {
            const sql = 'SELECT * FROM tb_detalleventa ORDER BY iddetalleventa'
            const { rows } = await pool.query(sql)
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR ventaController: " + error.message
            });
        }
    },

    searchUsuarioOrIDVentaByText: async(req, res) =>{
        try {
            const text = `${req.params.text}%`

            const sql = `
            SELECT v.idventa, u.idusuario, u.nombres, u.apellidos, u.correo, dv.idboleto, TO_CHAR(v.fecha, 'DD-MM-YYYY') AS fecha, dv.cantidad, dv.preunitario::float
            FROM tb_usuario u
            JOIN tb_venta v
            ON u.idusuario = v.idusuario
            JOIN tb_detalleventa dv
            ON v.idventa = dv.idventa
            WHERE CAST(v.idventa AS VARCHAR) ILIKE $1
            OR u.nombres ILIKE $1
            ORDER BY v.idventa DESC
            `
            
            const { rows } = await pool.query(sql, [text])
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR ventaController: " + error.message
            });
        }
    }
}

module.exports = ventaController