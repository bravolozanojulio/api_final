import {Schema, model} from 'mongoose'
import {afectadoSchema} from './afectado'
import {ubicacionSchema} from '../ubicacion'


const urgenciaSchema = new Schema({
    ident:{type:String, unique:true, required:true},
    provincia:{type:String, required:true},
    hospital:{type:String, required:true},
    ubicacionh:{type: ubicacionSchema, required:true},
    furgencia:{type:Date, required:true},
    seccion:{type:String,required:true},
    sintomas:{type:[String], required:true},
    diagnostico:{type:String, required:true},
    idmedico:{type:String,required:true},
    afectado:{type:afectadoSchema}
},{
    collection:'urgencias'
})

export const Urgencias = model('urgencias', urgenciaSchema)
