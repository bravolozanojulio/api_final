import {Schema, model} from 'mongoose'

// Creamos y exportamos el esquema de la clase 

export const afectadoSchema = new Schema({
    adulto:{type:Boolean,required:true},
    edad:{type:Number, required:true},
    sexo: {type:String, required:true},
    alergias: {type:[String],required:true},
    enfermedades: {type:[String],required:true}
},{
    collection:'urgencias'
})
