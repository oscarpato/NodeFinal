const Productos = require('../models/productos');
const Categorias = require('../models/categorias');
const Usuarios = require('../models/usuarios');


const existeNombreProducto = async(nombre) => {
    let producto = await Productos.findOne({ nombre });
    if (producto) {
        throw new Error(`El Nombre ${nombre} ya esta Ingresado`);
    }
}

const existeNombreCategoria = async(nombre) => {
    let categoria = await Categorias.findOne({ nombre });
    if (categoria) {
        throw new Error(`El Nombre '${nombre}' ya esta Ingresado`);
    }
}

const existeNombreUsuario = async (usuario) => {
    let nombreusuario = await Usuarios.findOne({usuario:usuario});
    if(nombreusuario){
        throw new error(`El Nombre de usuario: '${usuario}' ya existe`);
    }
}

module.exports = {
    existeNombreProducto,
    existeNombreCategoria,
    existeNombreUsuario
}