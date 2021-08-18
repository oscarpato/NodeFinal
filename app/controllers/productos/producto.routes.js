const express = require('express');
const app = express();
const { GetProductos, NewProducto, GetProducto } = require('./producto')
const { check } = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombreProducto } = require('../../helpers/validacionesDb')
const { validaJWT } = require('../../middlewares/validaJWT')
async function getProductos(req, res) {
    try {
        let respuesta = await GetProductos();
        res.send(respuesta);
    } catch (e) {
        res.send("Error en la busqueda de producto!!");
    }
}

async function newProducto(req, res) {
    try {
        let producto = req.body;
        console.log(producto);
        let respuesta = await NewProducto(producto);
        res.send(respuesta);
    } catch (e) {
        res.send("Error al ingresar Producto!!");
    }
}

async function getProducto(req, res) {
    try {
        let id = req.params.id;
        let respuesta = await GetProducto(id);
        res.send(respuesta);

    } catch (e) {
        res.send("Error en la busqueda del producto!!");
    }
}

//Get
app.get("/api/productos", getProductos);
app.get("/api/productos/:id", getProducto);
//Post
app.post("/api/productos", [
    //validaJWT,
    check('idProducto', 'El idProducto es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'Ingrese nombre superior a 3 caracteres').isLength({ min: 4 }),
    check('nombre').custom(existeNombreProducto),
    validacionesCampos
], newProducto)


module.exports = app;