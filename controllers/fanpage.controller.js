const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../routers/_config');

let _fanpage;//modelo

const createPub = (req,res)=>{
    const fanpage = req.body;

    _fanpage.create(fanpage)
        .then((data)=>{
            res.status(200);
            res.json({msg:"Publicacion creada correctamente", data: data});
        })
        .catch((err)=>{
            res.status(400);
            res.json({msg:"Error!", data:err});
        });
}

const updateComent = (req,res)=>{
    const {id} = req.params;
    const fanpage = req.body;

    const params={
        _id:id
    };
    _fanpage.findOneAndUpdate(params,fanpage)
    .then((data)=>{        
        res.status(status.OK);
        res.json({msg:"Exito!",data:data});
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error! no se pudo actualizar el comentario"});
    });
}


const findOne = (req,res)=>{
    const {id} = req.params;

    const params={
        _id:id
    };

    _fanpage.find(params)
        .then((data)=>{
            if(data.length ==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontro la publicacion"});
            }else{
                res.status(status.OK);
                res.json({msg:"Exito!",data:data});
            }
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        });
}

const promedio = (req,res)=>{
    const {id} = req.params;
    const params={
        _id:id
    };

    _fanpage.find(params)
        .then((data)=>{
            var prom=0;
            //console.log(data[0].calif.length);
            for(let i=0;i<data[0].calif.length;i++){
                prom=prom+data[0].calif[i];                
            }
            //console.log("promedio"+(prom)/data[0].calif.length);
            res.status(status.OK);
            res.json({msg:"El promedio de las calificaciones es: "+(prom)/data[0].calif.length});
            
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        });
}

module.exports = (Fanpage) =>{
    _fanpage = Fanpage; //se le asigna el valor del modelo
    return({
        createPub,
        updateComent,
        findOne,
        promedio
    });
}