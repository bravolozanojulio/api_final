import {Schema, model} from 'mongoose'

// Crearemos el esquema, y lo exportaremos

export const ubicacionSchema = new Schema({
    tipo:{type:String,required:true},
    coordinates:{type:[Number], required:true}
})
