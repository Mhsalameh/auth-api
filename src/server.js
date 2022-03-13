'use strict';
const express = require('express');
const authModel = require('./auth/router.js')
const serverError=require('./middleware/500.js')
const notFound = require('./middleware/404.js')
const cors = require('cors')
const app = express();
const v1 = require("./routes/v1.js");
const v2 = require("./routes/v2.js");


app.use(express.json());
app.use(cors())

app.use('/api/v1',v1);
app.use('/api/v2',v2);
app.use(authModel);

app.get('/',homeHandler)

function homeHandler(req,res){
    res.status(200).send("HOME!")
}




app.use('*',notFound)
app.use(serverError)


function start (port){
    app.listen(port,()=>{
        // console.log(`listening to port ${port}`)
    })
}

module.exports={
    app:app,
    start:start
}