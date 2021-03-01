"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tituloSchema = void 0;
const mongoose_1 = require("mongoose");
// Crearemos y exportaremos el esquema de la clase
exports.tituloSchema = new mongoose_1.Schema({
    ntitu: { type: String, required: true },
    tipo: { type: String, required: true },
    uni: { type: String, required: true },
    fecha: { type: Date, required: true }
}, {
    collection: 'medicos'
});
