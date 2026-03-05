const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a Aiven usando tus datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false } // Aiven requiere SSL activo
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a la base de datos "proyecto" en Aiven');
});

// Ruta de prueba para el Login
app.post('/login', (req, res) => {
    const { telefono, password } = req.body;
    const query = "SELECT nombre, rol FROM usuarios WHERE telefono = ? AND password = ?";

    db.query(query, [telefono, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) {
            res.json({ success: true, usuario: result[0] });
        } else {
            res.json({ success: false, message: "Datos incorrectos" });
        }
    });
});

// Ruta para registrar nuevos usuarios (Formato compatible)
app.post('/registro', (req, res) => {
    const { nombre, telefono, password } = req.body;
    const query = "INSERT INTO usuarios (nombre, telefono, password, rol) VALUES (?, ?, ?, 'cliente')";

    db.query(query, [nombre, telefono, password], (err, result) => {
        if (err) {
            console.error("Error en Aiven:", err);
            return res.status(500).json({ success: false, message: "Error al registrar o teléfono duplicado" });
        }
        res.json({ success: true, message: "Usuario creado con éxito" });
    });
});

app.listen(process.env.PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${process.env.PORT}`);
});