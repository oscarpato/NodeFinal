const express = require('express');
const app = express();
const { GetUsuario, GetUsuarios, LoginUsuario, DeleteUsuario, NewUsuario, EditUsuario } = require('./usuario');
const { existeNombreUsuario } = require('../../helpers/validacionesDb');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { check } = require('express-validator');
const { validaJWT, validaRolAdmin } = require('../../middlewares/validaJWT')

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

async function deleteUsuario(req,res){
    try{
        let usuario = req.params.usuario;
        let respuesta = await DeleteUsuario(usuario);
        res.send(respuesta);
    }catch(e){
        console.log("Entró a deleteUsuario try: "+e);
        res.send("Error eliminando usuario");
        }
}

async function newUsuario(req, res) {
    try {
        let user = req.body;
        console.log(user);
        let respuesta = await NewUsuario(user);
        res.send(respuesta);
    } catch (e) {
        res.send("Error al ingresar usuario");
    }
}
async function editUsuario(req,res){
    try {
        let id=req.params.usuario
        let user=req.body;
        let respuesta= await EditUsuario(id,user)
        res.send(respuesta);
    } catch (e) {
        console.log(e);
       res.send("Error en la actualizacion de datos")
        
    }

}

app.post('/api/login', LoginUsuario);

//usuario CRUD
app.get("/api/usuarios", getUsuarios);

app.get("/api/usuarios/:usuario", getUsuario);

app.delete("/api/usuarios/:usuario",[
    validaJWT,
    validaRolAdmin,
], deleteUsuario);

app.put("/api/usuarios/:usuario",[
    validaJWT,
    validaRolAdmin,
], editUsuario);

app.post("/api/usuarios", [
    validaJWT,
    validaRolAdmin,
    check('rol', 'rol es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').not().isEmpty(),
    check('clave', 'Ingrese clave de al menos 8 caracteres').isLength({ min: 8 }),
    check('usuario','Ingrese clave de al menos 8 caracteres').not().isEmpty(),
    validacionesCampos
], newUsuario);



module.exports = app;