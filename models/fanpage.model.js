const mongoose = require('mongoose');

let fanpageSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    keywords:{
        type:[String]
    },
    coments:{
        type:[String]
    },
    calif:{
        type:[Number]
    }
});
const fanpageModel = mongoose.model('Fanpage', fanpageSchema, 'fanpages');
  
module.exports = fanpageModel; 