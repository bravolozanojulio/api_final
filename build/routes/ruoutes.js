"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutas = void 0;
const express_1 = require("express");
const database_1 = require("../database/database");
const urgencias_1 = require("../model/urgencia/urgencias");
const medicos_1 = require("../model/medico/medicos");
class Rutas {
    constructor() {
        // A continuacion ,l los metodos de las rutas
        // Obtener todos los medicos
        this.getMedicos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield medicos_1.Medicos.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        // Obtener todos las urgencias 
        this.getUrgencias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield urgencias_1.Urgencias.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        // Obtener 1 Medico
        this.getMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ids1 } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query1 = yield medicos_1.Medicos.findOne({ nacreditacion: ids1 });
                res.json(query1);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        // Obtener 1 Urgencia
        this.getUrgencia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ids2 } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query2 = yield urgencias_1.Urgencias.findOne({ nregistro: ids2 });
                res.json(query2);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        // Agregar 
        this.addMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nacreditacion, nombre, sexo, fnacimiento, idiomas, localizacion, doctorado, titulos, suspensiones } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                nacreditacion: nacreditacion,
                nombre: nombre,
                sexo: sexo,
                fnacimiento: fnacimiento,
                idiomas: idiomas,
                localizacion: localizacion,
                doctorado: doctorado,
                titulos: titulos,
                "suspensiones": suspensiones
            };
            const oSchema = new medicos_1.Medicos(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.addUrgencia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ident, provincia, hospital, ubicacionh, furgencia, seccion, sintomas, diagnostico, idmedico, afectado } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                ident: ident,
                provincia: provincia,
                hospital: hospital,
                ubicacionh: ubicacionh,
                furgencia: furgencia,
                seccion: seccion,
                sintomas: sintomas,
                diagnostico: diagnostico,
                idmedico: idmedico,
                afectado: afectado
            };
            const oSchema = new urgencias_1.Urgencias(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        // Delete
        this.borrarMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ids3 } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query3 = yield medicos_1.Medicos.findOneAndDelete({ nacreditacion: ids3 });
                res.json(query3);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.borrarUrgencia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ids4 } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query4 = yield urgencias_1.Urgencias.findOneAndDelete({ nregistro: ids4 });
                res.json(query4);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        // Actualizar 
        this.actMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ids5 } = req.params;
            const { localizacion, doctorado, titulos, } = req.body;
            yield database_1.db.conectarBD();
            yield medicos_1.Medicos.findOneAndUpdate({ nacreditacion: ids5 }, {
                localizacion: localizacion,
                doctorado: doctorado,
                titulos: titulos,
            }, {
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.actUrgencias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ids6 } = req.params;
            const { idmedico, afectado } = req.body;
            yield database_1.db.conectarBD();
            yield urgencias_1.Urgencias.findOneAndUpdate({ nregistro: ids6 }, {
                idmedico: idmedico,
                afectado: afectado
            }, {
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        // Calculos 
        // Obtencion datos intoxicacion por alcohol
        this.alcohol = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield urgencias_1.Urgencias.aggregate([
                    {
                        $match: {
                            diagnostico: "Intoxicacion por alcohol"
                        }
                    },
                    { $group: {
                            _id: "",
                            Numero_pacientes: { $sum: 1 },
                            Edad_maxima: { $max: "$afectado.edad" },
                            Edad_minima: { $min: "$afectado.edad" },
                            Media_edad: { $avg: "$afectado.edad" },
                            Primer_caso: { $first: "$furgencia" },
                            Ultimo_caso: { $last: "$furgencia" },
                        }
                    }
                ]);
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.mandibula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield urgencias_1.Urgencias.aggregate([
                    {
                        $match: {
                            diagnostico: "Fractura de mandibula"
                        }
                    },
                    { $group: {
                            _id: "",
                            Numero_pacientes: { $sum: 1 },
                            Edad_maxima: { $max: "$afectado.edad" },
                            Edad_minima: { $min: "$afectado.edad" },
                            Media_edad: { $avg: "$afectado.edad" },
                            Primer_caso: { $first: "$furgencia" },
                            Ultimo_caso: { $last: "$furgencia" },
                        }
                    }
                ]);
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.herida = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield urgencias_1.Urgencias.aggregate([
                    {
                        $match: {
                            diagnostico: "Herida arma blanca"
                        }
                    },
                    { $group: {
                            _id: "",
                            Numero_pacientes: { $sum: 1 },
                            Edad_maxima: { $max: "$afectado.edad" },
                            Edad_minima: { $min: "$afectado.edad" },
                            Media_edad: { $avg: "$afectado.edad" },
                            Primer_caso: { $first: "$furgencia" },
                            Ultimo_caso: { $last: "$furgencia" },
                        }
                    }
                ]);
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        // Obtener urgencias donde los sintomas hayan sido Mareos y debilidad 
        this.general = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield urgencias_1.Urgencias.aggregate([
                    {
                        $match: {
                            seccion: "General"
                        }
                    },
                    {
                        $group: {
                            _id: "",
                            Numero_casos: { $sum: 1 },
                            Edad_maxima: { $max: "$afectado.edad" },
                            Edad_minima: { $min: "$afectado.edad" },
                            Media_edad: { $avg: "$afectado.edad" },
                            Primer_caso: { $first: "$furgencia" },
                            Ultimo_caso: { $last: "$furgencia" },
                        }
                    }
                ]);
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        // Obtener urgencias trauma
        this.trauma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield urgencias_1.Urgencias.aggregate([
                    {
                        $match: {
                            seccion: "Traumatología"
                        }
                    },
                    { $group: {
                            _id: "",
                            Numero_casos: { $sum: 1 },
                            Edad_maxima: { $max: "$afectado.edad" },
                            Edad_minima: { $min: "$afectado.edad" },
                            Media_edad: { $avg: "$afectado.edad" },
                            Primer_caso: { $first: "$furgencia" },
                            Ultimo_caso: { $last: "$furgencia" },
                        }
                    }
                ]);
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    // Definimos las rutas 
    misRutas() {
        // CRUD GET
        this._router.get('/medicos', this.getMedicos);
        this._router.get('/urgencias', this.getUrgencias);
        this._router.get('/medico/:ids1', this.getMedico);
        this._router.get('/urgencia/:ids2', this.getUrgencia);
        // CRUD POST
        this._router.post('/addMedico', this.addMedico);
        this._router.post('/addUrgencia', this.addUrgencia);
        this._router.post('/actMedico/:ids5', this.actMedico);
        this._router.post('/actUrgencia/:ids6', this.actUrgencias);
        this._router.delete('/borrarMedico/:ids3', this.borrarMedico);
        this._router.delete('/borrarUrgencia/:ids4', this.borrarUrgencia);
        // CRUD calculos
        this._router.get('/alcohol', this.alcohol);
        this._router.get('/mandibula', this.mandibula);
        this._router.get('/herida', this.herida);
        this._router.get('/general', this.general);
        this._router.get('/trauma', this.trauma);
    }
}
const obj = new Rutas();
obj.misRutas();
exports.rutas = obj.router;
