const pg = require('pg')
const { Pool } = pg

require("dotenv").config()
 
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAMEDB,
})

pool.connect((err) =>{
    if(err) throw err
    console.log("Coneccion a PostgreSQL correcta")
})

/*
const initBD = async() =>{
  const usuarioTB = `
  CREATE TABLE IF NOT EXISTS tb_usuario(
  idusuario serial PRIMARY KEY,
  nombres varchar(100),
  apellidos varchar(100),
  correo varchar(100) UNIQUE,
  contrasenia varchar(100),
  activa boolean NOT NULL
  );
  `

  const usuarioAdminTB = `
  CREATE TABLE IF NOT EXISTS tb_usuarioadmin(
  idusuario serial PRIMARY KEY,
  nombres varchar(100),
  apellidos varchar(100),
  correo varchar(100),
  contrasenia varchar(100)
  );
  `

  const peliculaTB = `
  CREATE TABLE IF NOT EXISTS tb_pelicula(
  idpelicula char(5) PRIMARY KEY,
  nombre varchar(100),
  descripcion varchar(500),
  generos varchar(50),
  restriccion varchar(10)
  );
  `

  const salaTB = `
  CREATE TABLE IF NOT EXISTS tb_sala(
  idsala varchar(2) PRIMARY KEY,
  disponibilidad int
  );
  `

  const boletoTB = `
  CREATE TABLE IF NOT EXISTS tb_boletoEntrada(
  idboleto serial PRIMARY KEY,
  idpelicula char(5),
  idsala varchar(2),
  horario varchar(30),
  fecha date,
  asientos varchar(250),
  cantidad int,
  FOREIGN KEY (idpelicula) REFERENCES tb_pelicula(idpelicula),
  FOREIGN KEY (idsala) REFERENCES tb_sala(idsala)
  );
  `

  const ventaTB = `
  CREATE TABLE IF NOT EXISTS tb_venta(
  idventa serial PRIMARY KEY,
  idusuario int,
  fecha date,
  FOREIGN KEY (idusuario) REFERENCES tb_usuario(idusuario)
  );
  `

  const detalleventaTB = `
  CREATE TABLE IF NOT EXISTS tb_detalleventa(
  iddetalleventa serial,
  idboleto int,
  idventa int,
  cantidad int,
  preunitario decimal(9,2),
  PRIMARY KEY (iddetalleventa, idboleto),
  FOREIGN KEY (idventa) REFERENCES tb_venta(idventa),
  FOREIGN KEY (idboleto) REFERENCES tb_boletoEntrada(idboleto)
  );
  `
  try {
    await pool.query(usuarioTB)
    await pool.query(usuarioAdminTB)
    await pool.query(peliculaTB)
    await pool.query(salaTB)
    await pool.query(boletoTB)
    await pool.query(ventaTB)
    await pool.query(detalleventaTB)

    console.log("Tablas creadas correctamente")
  } catch (error) {
    console.log('Error al crear tablas: ', error);
  }

}

initBD()
*/

module.exports = pool