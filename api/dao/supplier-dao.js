'use restrict'
const model = require('../infra/entities/supplier');

module.exports = {
    async getList(){
        return await model.findAll({raw:true});
    },
    async getById(id){
        return await model.findOne({
            raw:true,
            where:{
                id:id
            }
        });
    },
    create(supplier){
        return model.create(supplier)
    },
    update(supplier){
        return model.update(
            supplier,
            {
            where:{
                id:supplier.id
            }
        });
    },
    delete(id){
        return model.destroy({
            where:{
                id:id
            }
        });
    }
};