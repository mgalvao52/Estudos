'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const routes = require('./api/routes/supplier-route');

const app = express();
app.use(bodyParser.json());

app.get('/',(request,response)=>{
    response.status(200).send({mensagem:"API-PetShop"});
});

app.use('/api/suppliers',routes);

const port = config.get('api.port');
app.listen(port,()=>{
    console.log(`Server running at port ${port} `);
})

