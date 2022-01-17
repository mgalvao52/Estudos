'use strict'
const route  = require('express').Router();
const Supplier = require('../models/supplier');
const productRoute = require('./product-route');

route.get('/',async(request,response,next)=>{
    try {
        const supplier = new Supplier({});
        const result = await supplier.getList();
        response.status(200).send(JSON.stringify(result));
    } catch (error) {
       next(error);
    }
})
route.get('/:idSupplier',async(request,response,next)=>{
    try {
        const id = request.params.idSupplier;
        const data = new Supplier({id:id});
        await data.getById();
        response.status(200).send(JSON.stringify(data));
    } catch (error) {
        next(error);
    }
})
route.post('/',async (request,response,next)=>{
    try {
        const data = request.body;
        const supplier = new Supplier(data);
        await supplier.create();
        response.status(200).send(JSON.stringify(supplier));
    } catch (error) {
        next(error);
    }
})
route.put('/',async (request,response,next)=>{
    try {
        const data = request.body;
        const supplier = new Supplier(data);
        await supplier.update();
        await supplier.getById();
        response.status(200).send(JSON.stringify(supplier));
    } catch (error) {
        next(error);
    }
})

route.delete('/:id',async(request,response,next)=>{
    try {
        const supplier = new Supplier({id:request.params.id});
        await supplier.delete();
        response.status(200).send(JSON.stringify(supplier));
    } catch (error) {
        next(error);
    }
})

route.use('/:idSupplier/products',productRoute);

module.exports = route;