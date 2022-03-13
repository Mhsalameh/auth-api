'use strict';

const dataModel = require('../models/index.js');


module.exports=(req,res,next)=>{
    console.log(req.params)
    if (dataModel[req.params.model]){
        req.model=dataModel[req.params.model];
        // console.log(req.model)
        next();
    }
    else{
        next('model not available')
    }
}
// "localhost:3000/person"