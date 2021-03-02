"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suspensionSchema = void 0;
const mongoose_1 = require("mongoose");
// Creamos y exportamos el esquema de la clase 
exports.suspensionSchema = new mongoose_1.Schema({
    numero: { type: Number, required: true },
    inicio: { type: Date, required: true },
    final: { type: Date, required: true },
    motivos: { type: [String], required: true }
}, {
    collection: 'medicos'
});
