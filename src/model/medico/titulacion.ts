import {Schema, model} from 'mongoose'


// Crearemos y exportaremos el esquema de la clase

export const tituloSchema = new Schema({
    ntitu:{type:String, required:true},
    tipo: {type:String, required:true},
    uni:{type:String,required:true},
    fecha:{type:Date, required:true}
},
{
    collection:'medicos'
})
