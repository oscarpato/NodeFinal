const Producto = require('../../models/productos');

async function GetProductos() {
    let data = await Producto.find({});
    return data;
}

async function GetProducto(id) {
    let data = await Producto.findOne({ idProducto: id });
    return data;
}

async function GetProductom(nombre) {
    let data = await Producto.findOne({ nombre: nombre });
    return data;
}

async function NewProducto(producto) {

    let data2=await GetProductom(nombre);
    if(!data2){

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
}else{
    return "El producto ya existe";
}
}

async function EditProducto(id,producto){
    //console.log(id);
    let data2=await GetProducto(id);
    if(data2){
    if(producto.nombre !=undefined) {nom=producto.nombre; }else{ nom=data2.nombre;}
    if(producto.precio!=undefined){pre=producto.precio; }else{ pre=data2.precio;}
    if(producto.idCategoria !=null) {idc =producto.idCategoria; }else{ idc=data2.idCategoria;}
    if(producto.estado !=null) {est =producto.estado; }else{ est=data2.estado;}
    if(producto.imagen !=null) {ima =producto.imagen; }else{ ima=data2.imagen;}
    if(producto.descripcion !=null) {des =producto.descripcion; }else{ des=data2.descripcion;}

    let data = await Producto.updateOne({ idProducto: id },{nombre:nom,precio:pre,idCategoria:idc,estado:est,imagen:ima,descripcion:des});
    //console.log(data2);
    return data;
}else
    return "Producto no existente";

}

async function DeleteProducto(id){
    //console.log(id);
    let data=GetProducto(id);
    if(data){
    let data = await Producto.deleteOne({ idProducto: id });
    //console.log("entro");
    return data;
    }//else
    //console.log("no entro"); 
    //console.log(data2);
    

}

module.exports = {
    GetProductos,
    NewProducto,
    GetProducto,
    EditProducto,
    DeleteProducto
}