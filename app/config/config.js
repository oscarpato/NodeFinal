const dotenv = require('dotenv');
const resultado = dotenv.config();

if (typeof process.env.AMBIENTE == 'undefined') {
    console.log("Falta definir el Ambiente de ejecucion!!");
    return;
}

if (process.env.AMBIENTE && process.env.AMBIENTE.trim() == 'produccion') {
    console.log("produccion")
    process.env.Mongo = "mongodb://localhost:27017/dbTrabajoFinal";
} else {
    console.log("desarrollo")
    process.env.Mongo = "mongodb://localhost:27017/dbTrabajoFinaldev";
}