const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validaJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(403).json({
            msg: "no tiene token!!"
        })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRETKEY);
        console.log(payload);
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "token invalido!!"
        })
    }

}

const validaRolAdmin = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(403).json({
            msg: "no tiene token!!"
        })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRETKEY);
        let user = await Usuario.findOne({usuario:payload.usuario});
        if(!user || user.rol!="ADMIN"){
            return res.status(403).json({
                msg: "usuario no es ADMIN!!"
            })
        }
        //validar admin  
        console.log(payload);
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "token invalido!!"
        })
    }

}

const validaRolVendedor = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(403).json({
            msg: "no tiene token!!"
        })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRETKEY);
        let user = await Usuario.findOne({usuario:payload.usuario});
        if(!user || user.rol!="VENDEDOR"){
            return res.status(403).json({
                msg: "usuario no es VENDEDOR!!"
            })
        }
        //validar admin  
        console.log(payload);
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "token invalido!!"
        })
    }

}

module.exports = {
    validaJWT,
    validaRolAdmin,
    validaRolVendedor
}