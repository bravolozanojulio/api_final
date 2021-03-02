import {Schema} from 'mongoose'


// Creamos y exportamos el esquema de la clase 


export const suspensionSchema = new Schema({
    numero:{type: Number, required:true},
    inicio:{type: Date, required:true},
    final:{ type:Date, required:true},
    motivos:{type:[String], required:true}
},{
    collection:'medicos'
})
