import {Request, Response, Router } from 'express'
import {db} from '../database/database'

import {Urgencias} from '../model/urgencia/urgencias'
import {Medicos} from '../model/medico/medicos'



class Rutas {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }
    

// A continuacion ,l los metodos de las rutas


// Obtener todos los medicos

private getMedicos = async (req: Request, res: Response) => {
    await db.conectarBD()
    .then( async (mensaje) => {
            const query = await Medicos.find()
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }



// Obtener todos las urgencias 

    private getUrgencias = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
                const query = await Urgencias.find()
                console.log(query)
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
                console.log(mensaje)
            })
    
            db.desconectarBD()
        }
    
// Obtener 1 Medico

private getMedico = async (req:Request, res: Response) => {
    const {ids1} = req.params
    await db.conectarBD()
    .then( async ()=> {
        const query1 = await Medicos.findOne({nacreditacion: ids1})
        res.json(query1)
    })
    .catch((mensaje) => {
        res.send(mensaje)
    })
    await db.desconectarBD()
}


// Obtener 1 Urgencia

private getUrgencia = async (req:Request, res: Response) => {
    const {ids2} = req.params
    await db.conectarBD()
    .then( async ()=> {
        const query2 = await Urgencias.findOne({nregistro: ids2})
        res.json(query2)
    })
    .catch((mensaje) => {
        res.send(mensaje)
    })
    await db.desconectarBD()
}

// Agregar 


private addMedico = async (req: Request, res: Response) => {
    const {nacreditacion,nombre,sexo,fnacimiento,idiomas,localizacion,doctorado,titulos,suspensiones} = req.body
    await db.conectarBD()
    const dSchema={
        nacreditacion: nacreditacion,
        nombre: nombre,
        sexo: sexo,
        fnacimiento: fnacimiento,
        idiomas: idiomas,
        localizacion: localizacion,
        doctorado: doctorado,
        titulos: titulos,
        "suspensiones": suspensiones
    }
    const oSchema = new Medicos(dSchema)
    await oSchema.save()
        .then( (doc) => res.send(doc))
        .catch( (err: any) => res.send('Error: ' + err)) 
    await db.desconectarBD()
}



private addUrgencia = async (req: Request, res: Response) => {
    const {ident,provincia,hospital,ubicacionh,furgencia,seccion,sintomas,diagnostico,idmedico,afectado} = req.body
    await db.conectarBD()
    const dSchema={
        ident: ident,
        provincia: provincia,
        hospital: hospital,
        ubicacionh: ubicacionh,
        furgencia: furgencia,
        seccion: seccion,
        sintomas: sintomas,
        diagnostico: diagnostico,
        idmedico:idmedico,
        afectado:afectado
    }
    const oSchema = new Urgencias(dSchema)
    await oSchema.save()
        .then( (doc) => res.send(doc))
        .catch( (err: any) => res.send('Error: ' + err)) 
    await db.desconectarBD()
}



// Delete

private borrarMedico = async (req:Request, res: Response) => {
    const {ids3} = req.params
    await db.conectarBD()
    .then( async ()=> {
        const query3 = await Medicos.findOneAndDelete({nacreditacion:ids3})
        res.json(query3)
    })
    .catch((mensaje) => {
        res.send(mensaje)
    })
    await db.desconectarBD()
}

private borrarUrgencia = async (req:Request, res: Response) => {
    const {ids4} = req.params
    await db.conectarBD()
    .then( async ()=> {
        const query4 = await Urgencias.findOneAndDelete({nregistro:ids4})
        res.json(query4)
    })
    .catch((mensaje) => {
        res.send(mensaje)
    })
    await db.desconectarBD()
}

// Actualizar 

private actMedico = async (req: Request, res: Response) => {
    const {ids5 } = req.params
    const {localizacion, doctorado,titulos,} = req.body
    await db.conectarBD()
    await Medicos.findOneAndUpdate({nacreditacion:ids5},
    {
        localizacion:localizacion,
        doctorado:doctorado,
        titulos: titulos,
 
    },
    {
        runValidators:true
    }
    )
        .then( (doc) => res.send(doc))
        .catch( (err: any) => res.send('Error: '+ err)) 
    await db.desconectarBD()
}


private actUrgencias = async (req: Request, res: Response) => {
    const {ids6} = req.params
    const {idmedico,afectado} = req.body
    await db.conectarBD()
    await Urgencias.findOneAndUpdate({nregistro:ids6},
    {
        idmedico: idmedico,
        afectado: afectado
    },
    {
        runValidators:true
    }
    )
        .then( (doc) => res.send(doc))
        .catch( (err: any) => res.send('Error: '+ err)) 
    await db.desconectarBD()
}



// Calculos 


 // Obtencion datos intoxicacion por alcohol

private alcohol = async (req: Request, res: Response) => {
    await db.conectarBD()
    .then( async (mensaje) => {
            const query = await Urgencias.aggregate([
                 {
                    $match: {
                         diagnostico:"Intoxicacion por alcohol"
                          }
                 },
            
                 {$group:{
                             _id:"",
                             Numero_pacientes: {$sum:1},
                             Edad_maxima: {$max:"$afectado.edad"},
                             Edad_minima:{$min:"$afectado.edad"},
                             Media_edad: {$avg: "$afectado.edad"}, 
                             Primer_caso:{$first:"$furgencia"},
                             Ultimo_caso:{$last:"$furgencia"},     
                  }
                }
             ]
             )
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }


    private mandibula = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
                const query = await Urgencias.aggregate([
                     {
                        $match: {
                             diagnostico:"Fractura de mandibula"
                              }
                     },
                
                     {$group:{
                                 _id:"",
                                 Numero_pacientes: {$sum:1},
                                 Edad_maxima: {$max:"$afectado.edad"},
                                 Edad_minima:{$min:"$afectado.edad"},
                                 Media_edad: {$avg: "$afectado.edad"}, 
                                 Primer_caso:{$first:"$furgencia"},
                                 Ultimo_caso:{$last:"$furgencia"},     
                      }
                    }
                 ]
                 )
                console.log(query)
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
                console.log(mensaje)
            })
    
            db.desconectarBD()
        }
    

    private herida = async (req: Request, res: Response) => {
            await db.conectarBD()
            .then( async (mensaje) => {
                    const query = await Urgencias.aggregate([
                         {
                            $match: {
                                 diagnostico:"Herida arma blanca"
                                  }
                         },
                    
                         {$group:{
                                     _id:"",
                                     Numero_pacientes: {$sum:1},
                                     Edad_maxima: {$max:"$afectado.edad"},
                                     Edad_minima:{$min:"$afectado.edad"},
                                     Media_edad: {$avg: "$afectado.edad"}, 
                                     Primer_caso:{$first:"$furgencia"},
                                     Ultimo_caso:{$last:"$furgencia"},     
                          }
                        }
                     ]
                     )
                    console.log(query)
                    res.json(query)
                })
                .catch((mensaje) => {
                    res.send(mensaje)
                    console.log(mensaje)
                })
        
                db.desconectarBD()
            }
        




// Obtener urgencias donde los sintomas hayan sido Mareos y debilidad 

private general = async (req: Request, res: Response) => {
    await db.conectarBD()
    .then( async (mensaje) => {
            const query = await Urgencias.aggregate([
                 {
                    $match: {
                         seccion:"General"
                          }
                 },
            
                 {
                     $group:{
                             _id:"",
                             Numero_casos: {$sum:1},
                             Edad_maxima: {$max:"$afectado.edad"},
                             Edad_minima:{$min:"$afectado.edad"},
                             Media_edad: {$avg: "$afectado.edad"}, 
                             Primer_caso:{$first:"$furgencia"},
                             Ultimo_caso:{$last:"$furgencia"},     
                  }
                }
             ]
             )
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }

// Obtener urgencias trauma

    private trauma = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
                const query = await Urgencias.aggregate([
                     {
                        $match: {
                             seccion:"Traumatología"
                              }
                     },
                
                     {$group:{
                                 _id:"",
                                 Numero_casos: {$sum:1},
                                 Edad_maxima: {$max:"$afectado.edad"},
                                 Edad_minima:{$min:"$afectado.edad"},
                                 Media_edad: {$avg: "$afectado.edad"}, 
                                 Primer_caso:{$first:"$furgencia"},
                                 Ultimo_caso:{$last:"$furgencia"},     
                      }
                    }
                 ]
                 )
                console.log(query)
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
                console.log(mensaje)
            })
    
            db.desconectarBD()
        }
    
    


// Definimos las rutas 

    misRutas(){

        // CRUD GET

        this._router.get('/medicos', this.getMedicos)
        this._router.get('/urgencias', this.getUrgencias)
        this._router.get('/medico/:ids1', this.getMedico)
        this._router.get('/urgencia/:ids2', this.getUrgencia) 

        // CRUD POST

        this._router.post('/addMedico', this.addMedico)
        this._router.post('/addUrgencia', this.addUrgencia)
        this._router.post('/actMedico/:ids5',this.actMedico)
        this._router.post('/actUrgencia/:ids6',this.actUrgencias)


        this._router.delete('/borrarMedico/:ids3', this.borrarMedico)
        this._router.delete('/borrarUrgencia/:ids4',this.borrarUrgencia)

      // CRUD calculos

        this._router.get('/alcohol', this.alcohol)
        this._router.get('/mandibula', this.mandibula)
        this._router.get('/herida', this.herida)
        this._router.get('/general', this.general)
        this._router.get('/trauma', this.trauma)
       
    }
}

const obj = new Rutas()
obj.misRutas()
export const rutas = obj.router