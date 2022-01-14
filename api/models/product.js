'use strict'
class Product{
    constructor({id,title,price,amount,description}){
        this.id = id;
        this.title = title;
        this.price = price;
        this.amount = amount;
        this.description = description;
    }
}

module.exports = Product;