import {Schema} from 'mongoose'


// Creamos y exportamos el esquema de la clase 

export const tituloSchema = new Schema({
    ntitu:{type:String, required:true},
    tipo: {type:String, required:true},
    uni:{type:String,required:true},
    fecha:{type:Date, required:true}
},{
    collection:'medicos'
})
