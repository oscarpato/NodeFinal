const Producto = require('../../models/productos');

async function GetProductos() {
    let data = await Producto.find({});
    return data;
}

async function GetProducto(id) {
    let data = await Producto.findOne({ id: id });
    return data;
}

async function NewProducto(producto) {

    const { idProducto, nombre, idCategoria,estado, imagen, descripcion} = producto;

    let nuevoProducto = new Producto({
        idProducto,
        nombre,
        idCategoria, 
        estado, 
        imagen,
        descripcion
    })
    let data = await nuevoProducto.save();

    return data;
}

module.exports = {
    GetProductos,
    NewProducto,
    GetProducto
}