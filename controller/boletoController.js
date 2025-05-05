const pool = require('../database')

const boletoController = {
    getAll: async(req, res) =>{
        try {
            const sql = 'SELECT * FROM tb_boletoEntrada ORDER BY idboleto'
            const { rows } = await pool.query(sql)
            res.json(rows)
        } catch (error) {
            res.json({
                msg: "ERROR boletoController, " + error.msg
            })
        }
    },

    create: async(req,res) =>{
        try {
            const { idpelicula, idsala, horario, fecha, asientos, cantidad } = req.body
            const sql = 'INSERT INTO tb_boletoEntrada(idpelicula, idsala, horario, fecha, asientos, cantidad)'
            const { rows } = await pool.query(sql, [idpelicula, idsala, horario, fecha, asientos, cantidad])
            res.json(rows[0])
        } catch (error) {
            res.json({
                msg: "ERROR boletoController, " + error.msg
            })
        }
    },

    compraBoleto: async(req, res) =>{
        try {
            
            const { idusuario, idpelicula, horario, fecha, asientos, cantidad} = req.body
            const salaQuery = `
            SELECT 
            CASE 
                WHEN RIGHT(CAST(idpelicula AS TEXT), 1) = '0' THEN '1'
                ELSE RIGHT(CAST(idpelicula AS TEXT), 1)
            END AS num
            FROM tb_pelicula
            WHERE idpelicula = $1
            ORDER BY idpelicula DESC
            LIMIT 1;
            `

            const salaResult = await pool.query(salaQuery, [idpelicula])
            const idsala = salaResult.rows[0].num

            await pool.query('BEGIN')

            //tb_boletoEntrada insert
            const anioActual = new Date().getFullYear();
            const [day, month] = fecha.split('-')
            const fechaanio = `${anioActual}-${month}-${day}`

            const boletoQuery = `
            INSERT INTO tb_boletoEntrada (idpelicula, idsala, horario, fecha, asientos, cantidad, visible) 
            VALUES ($1, $2, $3, $4, $5, $6, TRUE) 
            RETURNING idboleto
            `

            const boletoResult = await pool.query(boletoQuery, [idpelicula, idsala, horario, fechaanio, asientos, cantidad])
            const idboleto = boletoResult.rows[0].idboleto
   
            
            //tb_venta insert
            const ventaQuery = 'INSERT INTO tb_venta (idusuario, fecha) VALUES ($1, CURRENT_DATE) RETURNING idventa'
            const ventaResult = await pool.query(ventaQuery, [idusuario])
            const idventa = ventaResult.rows[0].idventa

            //tb_detalleventa insert
            const detalleQuery = 'INSERT INTO tb_detalleventa (idboleto, idventa, cantidad, preunitario) VALUES ($1, $2, $3, 8.00)'
            
            await pool.query(detalleQuery, [idboleto, idventa, cantidad])

            await pool.query('COMMIT')

            res.json("Boleto comprado con exito")

        } catch (error) {
            await pool.query('ROLLBACK')
            res.status(500).json({
                msg: "ERROR boletoController: " + error.message
            });
        }
    },

    searchComprasByUser: async (req, res) =>{
        try {
            const sql = `
            SELECT be.idboleto, p.idpelicula, p.nombre, p.generos, p.restriccion, be.idsala, TO_CHAR(be.fecha, 'DD-MM-YYYY') AS fecha, be.horario, be.asientos, p.linkportada, be.visible
            FROM tb_boletoEntrada be
            JOIN tb_pelicula p ON p.idpelicula = be.idpelicula
            JOIN tb_detalleventa dv ON dv.idboleto = be.idboleto
            JOIN tb_venta v ON v.idventa = dv.idventa
            WHERE idusuario = $1
            ORDER BY fecha DESC
        `
        const { rows } = await pool.query(sql, [req.params.id])
        
        res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR boletoController: " + error.message
            });
        }
    }

}

module.exports = boletoController