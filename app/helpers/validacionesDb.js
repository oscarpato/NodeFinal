const Productos = require('../models/productos')


const existeNombreProducto = async(nombre) => {
    let producto = await Productos.findOne({ nombre });
    if (producto) {
        throw new Error(`El Nombre ${nombre} ya esta Ingresado`);
    }
}

module.exports = {
    existeNombreProducto
}