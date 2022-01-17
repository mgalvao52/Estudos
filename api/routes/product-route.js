const route = require('express').Router({mergeParams:true});
const Product = require('../models/product');

route.get('/',async (request,response,next)=>{
    try {
        const product = new Product({supplier:request.params.idSupplier});
        const result = await product.getList();
        response.status(200).send(JSON.stringify(result));
    } catch (error) {
        next(error);
    }

})
route.get('/:id',async (request,response,next)=>{
    try {
        const product = new Product({id:request.params.id});
        await product.getById();
        response.status(200).send(JSON.stringify(product));
        
    } catch (error) {
        next(error);
    }
})
route.post('/',async (request,response,next)=>{
    try {
        const id= request.params.idSupplier;
        const data = Object.assign({},request.body,{supplier:id});
        const product = new Product(data);
        await product.create();
        response.status(200).send(JSON.stringify(product));

    } catch (error) {
        next(error);
    }
})
route.post('/amount',async(request,response,next)=>{
    try {
        const data = request.body;
        const product = new Product(data);
        await product.updateAmount();
        await product.getById();
        response.status(200).send(JSON.stringify(product));

    } catch (error) {
        next(error);
    }
})
route.put('/',async(request,response,next)=>{
    try {
        const data = request.body;
        const idSupplier = request.params.idSupplier;
        const updateData = Object.assign({},data,{supplier:idSupplier});
        const product = new Product(updateData);
        await product.update();
        await product.getById();
        response.status(200).send(JSON.stringify(product));
    } catch (error) {
        next(error);
    }
})
route.delete('/:id',async(request,response,next)=>{
    try {
        const product = new Product({id:request.params.id});
        await product.delete();
        response.status(200).send(product);
    } catch (error) {
        next(error);
    }
})

module.exports = route;