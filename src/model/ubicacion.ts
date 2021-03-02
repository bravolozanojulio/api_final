import {Schema, model} from 'mongoose'

// Creamos y exportamos el esquema de la clase 

export const ubicacionSchema = new Schema({
    tipo:{type:String,required:true},
    coordinates:{type:[Number], required:true}
})