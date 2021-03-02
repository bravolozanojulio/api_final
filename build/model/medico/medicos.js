"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicos = void 0;
const mongoose_1 = require("mongoose");
const titulacion_1 = require("./titulacion");
const suspension_1 = require("./suspension");
const ubicacion_1 = require("../ubicacion");
// Creamos el esquema de la clase
const medicoSchema = new mongoose_1.Schema({
    nacreditacion: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    sexo: { type: String, required: true },
    fnacimiento: { type: Date, required: true },
    idiomas: { type: [String], required: true },
    localizacion: { type: ubicacion_1.ubicacionSchema, required: true },
    doctorado: { type: Boolean, required: true },
    titulos: { type: [titulacion_1.tituloSchema], required: true },
    suspensiones: { type: [suspension_1.suspensionSchema], required: true }
}, {
    collection: 'medicos'
});
// Para finalizar exportaremos 
exports.Medicos = mongoose_1.model('medicos', medicoSchema);
