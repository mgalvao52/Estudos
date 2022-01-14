'use restrict'
const model = require('../infra/entities/product');

module.exports = {
    async getList(){
        return await model.findAll({raw:true});
    },
    async getById(idProduct,idSupplier){
        return model.findOne({
            where:{
                id:idProduct,
                supplier:idSupplier
            },
            raw:true
        });
    },
    create(product){
        return model.create(product);
    },
    update(product){
        return model.update({
            product,
            where:{
                id:product.id,
                supplier:product.supplier
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