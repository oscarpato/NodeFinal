const express = require('express');
const app = express();
const { GetCategorias, NewCategoria, GetCategoria, UpdateCategoria, DeleteCategoria } = require('./categoria')
const { check } = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombreCategoria } = require('../../helpers/validacionesDb')
const { validaJWT } = require('../../middlewares/validaJWT')

async function getCategorias(req, res) {
    try {

        let respuesta = await GetCategorias();
        res.send(respuesta);

    } catch (e) {
        res.send("Error en la busqueda de categorias!!");
    }
}

async function newCategoria(req, res) {
    try {
        console.log("Entró a newcategoria try");
        let categoria = req.body;
        console.log(categoria);
        let respuesta = await NewCategoria(categoria);
        res.send(respuesta);
    } catch (e) {
        res.send("Error al ingresar Categoria!!");
    }
}

async function getCategoria(req, res) {
    try {
        let id = req.params.id;
        let respuesta = await GetCategoria(id);
        res.send(respuesta);

    } catch (e) {
        res.send("Error en la busqueda de la Categoria!!");
    }
}

async function updateCategoria(req,res){
    try{
        console.log("Entró a updatecategoria try");
        let id = req.params.id;
        let categoria = req.body;
        //console.log(`id es: ${id}`);
        console.log(`nuevo body es: ${categoria}`);
        let respuesta = await UpdateCategoria(id, categoria);
        console.log("volvio de la funcion updatecategoria");
        res.send(respuesta);
    }catch(e){
        let id = req.params.id;
        res.send(`Error al actualizar la categoria con id ${id}!!`);
        }
}

async function deleteCategoria(req,res){
    try{
        console.log("Entró a deletecategoria try");
        let id = req.params.id;
        let respuesta = await DeleteCategoria(id);
        console.log("volvio de la funcion deleteCategoria");
        res.send(respuesta);
    }catch(e){
        console.log("Entró a deletecategoria try: "+e);
        res.send("Error al borrar la Categoria!!");
        }
}

//Get
app.get("/api/categorias", getCategorias);
app.get("/api/categorias/:id", getCategoria);

//Post
app.post("/api/categorias", [
    //validaJWT,
    check('idCategoria', 'idCategoria es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'Ingrese nombre superior a 3 caracteres').isLength({ min: 4 }),
    check('nombre').custom(existeNombreCategoria),
    validacionesCampos
], newCategoria);

//PUT
app.put("/api/categorias/:id", updateCategoria);

//DELETE
app.delete("/api/categorias/:id", deleteCategoria);


module.exports = app;