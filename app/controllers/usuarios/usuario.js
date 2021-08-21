const Usuario = require('../../models/usuarios')
const { generaJWT } = require('../../helpers/generarToken')

const GetUsuarios = async() => {
    const data = await Usuario.find({});
    return data;
}
const GetUsuario = async(usuario) => {
    const data = await Usuario.findOne({ usuario });
    return data;

}

const LoginUsuario = async(req, res) => {
    const { usuario, clave } = req.body;
    const user = await Usuario.findOne({ usuario, clave });
    if (!user) {
        return res.status(403).json({
            mensaje: "Login Incorrecto!!"
        })
    }
    const token = await generaJWT(user.usuario)
    res.json({
        usuario: user.usuario,
        token
    })
}

async function DeleteUsuario(usuario){
    let data = await Usuario.deleteOne({usuario:usuario});
    return data;
}

async function NewUsuario(user) {
    console.log(user.usuario);
    let data = await Usuario.findOne({usuario:user.usuario});
    console.log(data);
    if (!data){
       try {
            const { usuario, email, clave, rol } = user;
            let nuevoUsuario = new Usuario({
                usuario:usuario,
                email:email,
                clave:clave,
                rol:rol
            })
            data = await nuevoUsuario.save();
            return data;
      } catch (err){
            console.log("Error catch : "+err)
        }
    } else {
        return `El usuario ${user.usuario} ya existe en DB`
    }

    return data;
}

async function EditUsuario(id,usuario){
    //console.log(id);
    let data2=await GetUsuario(id);
    if(data2){
        if(usuario.usuario) {usu=usuario.usuario; }else{ usu=data2.usuario;}
        if(usuario.email){em=usuario.email; }else{ em=data2.email;}
        if(usuario.clave) {cl =usuario.clave; }else{ cl=data2.clave;}
        if(usuario.rol) {rol =usuario.rol; }else{ rol=data2.rol;}

        let data = await Usuario.updateOne({ usuario: id },{
            usuario:usu,
            email:em,
            clave:cl,
            rol:rol
        });
        //console.log(data2);
        return data;
    }else
        return "Usuario no existente";

}


module.exports = {
    GetUsuarios,
    GetUsuario,
    LoginUsuario,
    EditUsuario,
    DeleteUsuario,
    NewUsuario
}