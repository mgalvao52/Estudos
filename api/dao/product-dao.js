'use restrict'
const model = require('../infra/entities/product');

module.exports = {
    async getList(supplier){
        return await model.findAll({
            where:{
                supplier:supplier
            },
            raw:true
        });
    },
    async getById(idProduct){
        return model.findOne({
            where:{
                id:idProduct
            },
            raw:true
        });
    },
    create(product){
        return model.create(product);
    },
    update(product){
        return model.update(
            product,
            {
            where:{
                id:product.id
            }
        });
    },
    delete(idProduct){
        return model.destroy({
            where:{
                id:idProduct
            }
        })
    }

};