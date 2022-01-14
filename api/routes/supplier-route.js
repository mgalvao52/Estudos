'use strict'
const route  = require('express').Router();
const supplierRepository = require('../repositories/supplier-repository');

route.get('/',async(request,response)=>{
    try {
        const data = await supplierRepository.getList();
        response.status(200).send(JSON.stringify(data));
    } catch (error) {
        response.status(400).send({message:'request fail',error:error});
    }
})
route.get('/:idSupplier',async(request,response)=>{
    try {
        const id = request.params.idSupplier;
        const data = await supplierRepository.getById(id);
        response.status(200).send(JSON.stringify(data));
    } catch (error) {
        response.status(400).send({message:'request fail'});
    }
})
route.post('/',(request,response)=>{
    try {
        const data = request.body;
        const supplier = supplierRepository.create(data);
        response.status(200).send(supplier);
    } catch (error) {
        response.status(400).send({message:'request fail'});
    }
})



module.exports = route;