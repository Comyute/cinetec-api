const pool = require('../database')

const usuarioController = {
    getAll: async(req, res) =>{
        try {
            const { rows } = await pool.query('SELECT*FROM tb_usuario ORDER BY idusuario')
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    },

    create: async(req, res) =>{
        try {
            const { nombres, apellidos, correo, contrasenia, activa } = req.body

            const sql = 'INSERT INTO tb_usuario (nombres, apellidos, correo, contrasenia, activa) VALUES ($1,$2,$3,$4,$5) RETURNING *'
            const { rows } = await pool.query(sql, [nombres, apellidos, correo, contrasenia, activa])
            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    },

    loginChecking: async(req, res) =>{
        try {
            const { correo, contrasenia } = req.body
            const sql = 'SELECT * FROM tb_usuario WHERE correo = $1 AND contrasenia = $2'
            const { rows } = await pool.query(sql, [correo, contrasenia])

            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    },

    searchById: async (req, res) =>{
        try {
            const text = `${req.params.id}%`
            const sql = `SELECT * FROM tb_usuario WHERE CAST(idusuario AS VARCHAR) ILIKE $1 OR nombres ILIKE $1 ORDER BY idusuario`
            const { rows } = await pool.query(sql, [text])

            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    },

    getLastVentaById: async(req, res) =>{
        try {
            const sql = `
            SELECT v.idventa, v.idusuario, TO_CHAR(v.fecha, 'DD-MM-YYYY') as fecha
            FROM tb_usuario u
            JOIN tb_venta v ON v.idusuario = u.idusuario
            WHERE u.idusuario = $1
            ORDER BY v.idventa DESC LIMIT 1
            `
            const { rows } = await pool.query(sql, [req.params.id])

            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    },

    deleteById: async (req,res) =>{
        try {
            const sql = 'DELETE FROM tb_usuario WHERE idusuario = $1 RETURNING *'
            const { rows } = await pool.query(sql, [req.params.id])
            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            })
        }
    },

    updateById: async (req, res) =>{
        try {
            const { idusuario, nombres, apellidos, correo, contrasenia } = req.body
            const sql = 'UPDATE tb_usuario SET nombres=$1, apellidos=$2, correo=$3, contrasenia=$4, activa=true WHERE idusuario=$5'
            const { rows } = await pool.query(sql, [nombres, apellidos, correo, contrasenia, idusuario])
            res.json("Actualizado correctamente")
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            })
        }
    },

    disableUser: async(req, res) =>{
        try {
            const idusuario = req.params.id

            const UsuarioSql = 'SELECT * FROM tb_usuario WHERE idusuario = $1';
            const { rows: usuarioRows } = await pool.query(UsuarioSql, [idusuario]);
            
            const usuarioActual = usuarioRows[0]

            const nombres = usuarioActual.nombres
            const apellidos = usuarioActual.apellidos
            const contrasenia = usuarioActual.contrasenia

            const qDeshabilitar = `UPDATE tb_usuario SET nombres=$1, apellidos=$2, correo=NULL, contrasenia=$3, activa=false WHERE idusuario=$4 RETURNING *`
            const { rows: updateRows } = await pool.query(qDeshabilitar, [nombres, apellidos, contrasenia, idusuario])

            res.json(updateRows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            })
        }
    },

    findById: async(req, res) =>{
        try {
            const sql = 'SELECT * FROM tb_usuario WHERE idusuario=$1'
            const { rows } = await pool.query(sql, [req.params.id])
            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            })
        }
    },

    createAdmin: async(req, res) =>{
        try {
            const { nombres, apellidos, correo, contrasenia } = req.body

            const sql = 'INSERT INTO tb_usuarioadmin (nombres, apellidos, correo, contrasenia) VALUES ($1,$2,$3,$4) RETURNING *'
            const { rows } = await pool.query(sql, [nombres, apellidos, correo, contrasenia])
            res.json(rows[0])
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    },

    getAllAdmins: async(req, res) =>{
        try {
            const sql = 'SELECT * FROM tb_usuarioadmin ORDER BY idusuario'
            const { rows } = await pool(sql)
            res.json(rows)
        } catch (error) {
            res.status(500).json({
                msg: "ERROR usuarioController: " + error.message
            });
        }
    }

}

module.exports = usuarioController