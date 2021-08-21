const express = require('express');
const app = express();

app.use(require('../controllers/usuarios/usuario.routes'))
app.use(require('../controllers/productos/producto.routes'))
app.use(require('../controllers/categorias/categoria.routes'))

module.exports = app;