const jwt = require('jsonwebtoken');

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

module.exports = {
    validaJWT
}