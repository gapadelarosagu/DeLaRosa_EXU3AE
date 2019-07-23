const router = require('express').Router();

module.exports = (wagner)=>{

const fanCtrl= wagner.invoke((Fanpage)=> require('../controllers/fanpage.controller')(Fanpage));

    router.post('/',(req,res)=>{
        fanCtrl.createPub(req,res);
    });

    router.put('/:id',(req,res)=>{
        fanCtrl.updateComent(req,res);
    });

    router.get('/:id',(req,res)=>{
        fanCtrl.findOne(req,res);
    });
    router.get('/promedio/:id',(req,res)=>{
        fanCtrl.promedio(req,res);
    });

    return router;

}
