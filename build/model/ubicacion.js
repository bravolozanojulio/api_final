"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ubicacionSchema = void 0;
const mongoose_1 = require("mongoose");
// Crearemos el esquema, y lo exportaremos
exports.ubicacionSchema = new mongoose_1.Schema({
    tipo: { type: String, required: true },
    coordinates: { type: [Number], required: true }
});
