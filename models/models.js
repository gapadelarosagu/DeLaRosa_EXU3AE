const mongoose = require('mongoose');
const _ = require('underscore');
const config = require('../routers/_config');

module.exports = (wagner) =>{
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:27017/${config.DB}`,{ useNewUrlParser: true });

    wagner.factory('db',()=>mongoose); //se nombra la var db y se le pone como valor la conexion de la bd
    const Fanpage = require('./fanpage.model'); //es el modelo

    const models ={ //el objeto va a tener todo el modelos que requiera la app, con el underscore se recorre todo
        Fanpage
    }

    _.each(models,(v,k)=>{ // k=nombre de la var y v= contenido
        wagner.factory(k, ()=>v); //asi se interpreta que quedaria de la otra forma wagner.factory('db',()=>mongoose)
    });
}