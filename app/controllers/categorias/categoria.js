const Categoria = require('../../models/categorias');


async function GetCategorias() {
    let data = await Categoria.find({});
    return data;
}

async function GetCategoria(id) {
    let data = await Categoria.findOne({ id: id });
    return data;
}

async function NewCategoria(categoria) {

    let data = await Categoria.findOne({idCategoria:categoria.idCategoria});
    console.log(data);
    if (!data){
        try {
            const { idCategoria, nombre, estado } = categoria;
            //console.log("llego la categoria: "+categoria);
            let nuevaCategoria = new Categoria({
                idCategoria,
                nombre,
                estado
            })
            let data = await nuevaCategoria.save();
        } catch (err){
            console.log("Error catch : "+err)
        }
    } else {
        return `El id ${categoria.idCategoria} ya existe en DB`
    }

    return data;
}


async function UpdateCategoria(id, categoria){


    let data = await Categoria.findOne({idCategoria:id});
    let ejecucionUpdate = "";

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };
    try {
        data = await Categoria.updateOne({idCategoria:id}, { $set: {
            "idCategoria": categoria.idCategoria,
            "nombre": categoria.nombre,
            "estado": categoria.estado
        }}, options);
        ejecucionUpdate = `Categoria ${id} se actualizo correctamente`;
    } catch (err) {
        console.log(err);
        ejecucionUpdate = `Error al acutualizar Categoria ${id}`;
    }
    console.log("resultado de ejecucionUpdate: "+ejecucionUpdate);

    return ejecucionUpdate;
}

async function DeleteCategoria(id){
    console.log("id es: "+id);
    let data = await Categoria.deleteOne({idCategoria:id});
    console.log("id es: "+id);
    //console.log("idCategoria es: "+idCategoria);
    console.log("data es: "+data);
    //await Categoria.deleteOne({id:idCategoria});
}

module.exports = {
    GetCategorias,
    NewCategoria,
    GetCategoria,
    UpdateCategoria,
    DeleteCategoria
}