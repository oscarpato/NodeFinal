const express = require('express');

const app = express();
const { GetUsuario, GetUsuarios, LoginUsuario } = require('./usuario')

async function getUsuarios(req, res) {
    try {
        let data = await GetUsuarios();
        return res.send(data);
    } catch (error) {
        res.status(500).send("Error al buscar Usuarios");
    }
}

const getUsuario = async(req, res) => {
    try {
        let usuario = req.params.usuario;
        let data = await GetUsuario(usuario);
        return res.send(data);

    } catch (error) {
        res.status(500).send("Error al buscar Usuario");
    }
}

app.post('/api/login', LoginUsuario);
app.get("/api/usuarios", getUsuarios);
app.get("/api/usuarios/:usuario", getUsuario);


module.exports = app;