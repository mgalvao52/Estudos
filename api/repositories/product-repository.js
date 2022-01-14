'use strict'

const productDao = require('../dao/product-dao');

module.exports = {
    async getList(){
        return await productDao.getList();
    },
    async getById(product){
        const data = await productDao.getById(product.id,product.supplier);
        if(!data){
            throw new Error('product not found')
        }
        return data;
    },
    create(product){
       return productDao.create(product);
    },
    update(product){
        productDao.getById(product)
            .then(prod=>{
                productDao.update(product);
                return product;
            })
            .catch(error=>{
                console.log(error);
                throw new Error(error);
            });
    },
    delete(id){
        const data = productDao.delete(id);
        return data;
    }
}
