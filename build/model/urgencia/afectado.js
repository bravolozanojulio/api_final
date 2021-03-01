"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afectadoSchema = void 0;
const mongoose_1 = require("mongoose");
// Creamos y exportamos el esquema de la clase 
exports.afectadoSchema = new mongoose_1.Schema({
    adulto: { type: Boolean, required: true },
    edad: { type: Number, required: true },
    sexo: { type: String, required: true },
    alergias: { type: [String], required: true },
    enfermedades: { type: [String], required: true }
}, {
    collection: 'urgencias'
});
