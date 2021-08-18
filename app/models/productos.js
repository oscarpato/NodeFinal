const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({

    idProducto: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String
    },
    precio: {
        type: Number
    },
    idCategoria: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String
    },
    descripcion: {
        type: String
    },

}, {
    timestamps: true,
    versionKey: false
})

/*categoriasSchema.methods.toJSON = function() {
    const { clave, ...usuario } = this.toObject();
    return usuario;
}*/


module.exports = mongoose.model('productos', productosSchema, 'productos');