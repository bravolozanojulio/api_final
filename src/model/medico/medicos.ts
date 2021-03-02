import {Schema, model} from 'mongoose'
import {tituloSchema} from './titulacion'
import {suspensionSchema} from './suspension'
import {ubicacionSchema} from '../ubicacion'

// Creamos el esquema de la clase

const medicoSchema = new Schema({
    nacreditacion: {type: String, required:true,unique: true},
    nombre:{type: String, required:true},
    sexo:{type:String,required:true},
    fnacimiento:{type:Date,required:true},
    idiomas:{type:[String], required:true},
    localizacion:{type:ubicacionSchema, required:true},
    doctorado:{type:Boolean, required:true},
    titulos:{type: [tituloSchema], required:true},
    suspensiones:{type:[suspensionSchema], required:true}
},{
collection:'medicos'
})


// Para finalizar exportaremos 

export const Medicos = model('medicos', medicoSchema)

