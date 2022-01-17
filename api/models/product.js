'use strict'
const FieldValidation = require('../custom-errors/filed-validation');
const NotFound = require('../custom-errors/not-found');
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
        this.validate();
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
            throw new NotFound('product not found');
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
        
        if(typeof this.price === 'number' && this.price >= 0){
            updateFields.price = this.price;
        }else{
            if(this.price){
                throw new FieldValidation(`the 'price' field cannot be less then or equal to zero`);
            }
        }
        if(typeof this.amount === 'number' && this.amount >= 0){
            updateFields.amount = this.amount
        }else{
            if(this.amount){
                throw new FieldValidation(`the 'amount' field cannot be less then or equal to zero`)
            }
        }
        if(typeof this.title === 'string' && this.title.length > 0){
            updateFields.title = this.title;
        }else{
            if(this.title){
                throw new FieldValidation(`the 'title' field is required`)
            }
        }
        

        if(Object.keys(updateFields).length === 0){
            throw new FieldValidation('product cannot be null');
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

    validate(){
        if(this.price <= 0){
            throw new FieldValidation("'price' cannot be less than or equal to zero")    
        }
        if(!this.price){
            throw new FieldValidation(` the 'price' field is required `)
        }
        if(this.amount < 0){
            throw new FieldValidation("'amount' cannot be less than zero")    
        }
        if(!this.amount){
            throw new FieldValidation(` the 'amount' field is required `)
        }
        if(typeof this.title === 'string' && this.title.length <= 0){
            throw new FieldValidation(`the 'title' field is required`)
        }
    }
}

module.exports = Product;