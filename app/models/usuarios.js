const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({

    usuario: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    clave: {
        type: String
    },
    rol: {
        type: String,
        emun: ['VENDEDOR', 'ADMIN']
    }
}, {
    timestamps: true,
    versionKey: false
})

usuariosSchema.methods.toJSON = function() {
    const { clave, ...usuario } = this.toObject();
    return usuario;
}


module.exports = mongoose.model('usuarios', usuariosSchema, 'usuarios');