'use strict'
const route  = require('express').Router();
const Supplier = require('../models/supplier');
const productRoute = require('./product-route');

route.get('/',async(request,response)=>{
    try {
        const supplier = new Supplier({});
        const result = await supplier.getList();
        response.status(200).send(JSON.stringify(result));
    } catch (error) {
        response.status(400).send({message:'request fail',error:error});
    }
})
route.get('/:idSupplier',async(request,response)=>{
    try {
        const id = request.params.idSupplier;
        const data = new Supplier({id:id});
        await data.getById();
        response.status(200).send(JSON.stringify(data));
    } catch (error) {
        response.status(400).send({message:'request fail'});
    }
})
route.post('/',async (request,response)=>{
    try {
        const data = request.body;
        const supplier = new Supplier(data);
        await supplier.create();
        response.status(200).send(JSON.stringify(supplier));
    } catch (error) {
        response.status(400).send({message:'request fail'});
    }
})
route.put('/',async (request,response)=>{
    try {
        const data = request.body;
        const supplier = new Supplier(data);
        await supplier.update();
        await supplier.getById();
        response.status(200).send(JSON.stringify(supplier));
    } catch (error) {
        response.status(400).send({message:'request fail'});
    }
})

route.delete('/:id',async(request,response)=>{
    try {
        const supplier = new Supplier({id:request.params.id});
        await supplier.delete();
        response.status(200).send(JSON.stringify(supplier));
    } catch (error) {
        response.status(400).send({message:'request fail'});
    }
})

route.use('/:idSupplier/products',productRoute);

module.exports = route;