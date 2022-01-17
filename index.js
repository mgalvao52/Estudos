'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const routes = require('./api/routes/supplier-route');
const NotFound = require('./api/custom-errors/not-found');
const FieldValidation = require('./api/custom-errors/filed-validation');

const app = express();
app.use(bodyParser.json());

app.get('/',(request,response)=>{
    response.status(200).send({mensagem:"API-PetShop"});
});

app.use('/api/suppliers',routes);

app.use('/',(error,request,response,next)=>{
    if(error instanceof NotFound){
        response.status(404).send({id:error.id,message:error.message});
        return;
    }
    if(error instanceof FieldValidation){
        response.status(400).send({id:error.id,message:error.message});
        return;
    }

    response.status(500).send({id:999,message:'request failure'})
})
const port = config.get('api.port');
app.listen(port,()=>{
    console.log(`Server running at port ${port} `);
})

