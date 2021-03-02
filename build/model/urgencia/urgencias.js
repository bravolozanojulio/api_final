"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Urgencias = void 0;
const mongoose_1 = require("mongoose");
const afectado_1 = require("./afectado");
const ubicacion_1 = require("../ubicacion");
// Creamos el esquema de la clase
const urgenciaSchema = new mongoose_1.Schema({
    ident: { type: String, unique: true, required: true },
    provincia: { type: String, required: true },
    hospital: { type: String, required: true },
    ubicacionh: { type: ubicacion_1.ubicacionSchema, required: true },
    furgencia: { type: Date, required: true },
    seccion: { type: String, required: true },
    sintomas: { type: [String], required: true },
    diagnostico: { type: String, required: true },
    idmedico: { type: String, required: true },
    afectado: { type: afectado_1.afectadoSchema }
}, {
    collection: 'urgencias'
});
// Para finalizar exportaremos 
exports.Urgencias = mongoose_1.model('urgencias', urgenciaSchema);
