'use strict'
const res = require('express/lib/response');
const productDao = require('../dao/product-dao');
class Product{
    constructor({id,title,price,amount,description,createdAt,updatedAt,supplier}){
        this.id = id;
        this.title = title;
        this.price = price;
        this.amount = amount;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.supplier = supplier;
    }
    async getList(){
        return productDao.getList(this.supplier);
    }
    async create(){
       const result = await productDao.create({
           title:this.title,
           price:this.price,
           amount:this.amount,
           description:this.description,
           supplier:this.supplier
       });
       this.id = result.id;
       this.createdAt = result.createdAt;
       this.updatedAt = result.updatedAt;
    }
    async getById(){
        const result = await productDao.getById(this.id);
        if(!result){
            throw new Error('product not found');
        }
        this.id = result.id;
        this.price = result.price;
        this.description = result.description;
        this.title = result.title;
        this.amount = result.amount;
        this.updatedAt = result.updatedAt;
        this.createdAt = result.createdAt;
        this.supplier = result.supplier;
    }
    async update(){
        const updateFields = {}
        if(typeof this.price === 'number' && this.price > 0){
            updateFields.price = this.price;
        }
        if(typeof this.amount === 'number' && this.amount >= 0){
            updateFields.amount = this.amount
        }
        if(typeof this.title === 'string' && this.title.length > 0){
            updateFields.title = this.title;
        }
        
        if(Object.keys(updateFields).length === 0){
            throw new Error('product cann´t be null');
        }
        if(this.description){
            updateFields.description = this.description;
        }
        updateFields.id = this.id;
        updateFields.supplier = this.supplier;
        await productDao.update(updateFields);
    }
    async delete(){
        await this.getById();
        return await productDao.delete(this.id);
    }
}

module.exports = Product;