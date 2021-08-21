const express = require('express');
const app = express();
const { GetProductos, NewProducto, GetProducto,EditProducto, DeleteProducto } = require('./producto')
const { check } = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombreProducto } = require('../../helpers/validacionesDb')
const { validaJWT, validaRolVendedor } = require('../../middlewares/validaJWT')
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
        console.log(e);
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

async function editProducto(req,res){
    try {
        let id=req.params.id
        let producto=req.body;
        let respuesta= await EditProducto(id,producto)
        res.send(respuesta);
    } catch (e) {
        console.log(e);
       res.send("Error en la actualizacion de datos")
        
    }

}

async function deleteProducto(req,res){
    try {
        let id=req.params.id
        //let pais=req.body;
        let respuesta= await DeleteProducto(id)
        res.send(respuesta);
    } catch (e) {
        console.log(e);
       res.send("Error en la actualizacion de datos")
        
    }
}

//Get
app.get("/api/productos", getProductos);
app.get("/api/productos/:id", getProducto);

//update
app.put("/api/productos/:id",[
    validaJWT,
    validaRolVendedor,
    check('imagen','Debe ser una direccion valida').isURL({require_protocol:true}),
],editProducto)

//Post
app.post("/api/productos", [
    validaJWT,
    validaRolVendedor,
    check('idProducto', 'El idProducto es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'Ingrese nombre superior a 3 caracteres').isLength({ min: 4 }),
    check('nombre').custom(existeNombreProducto),
    check('imagen','Debe ser una direccion valida').isURL({require_protocol:true}),
    validacionesCampos
], newProducto)

//Delete

app.delete("/api/productos/:id",[
    validaJWT,
    validaRolVendedor],deleteProducto);


module.exports = app;