'use restrict'
const supplierDao = require('../dao/supplier-dao');

module.exports = {
    async getList(){
        return await supplierDao.getList();
    },
    async getById(id){
        const data = await supplierDao.getById(id);
        if(!data){
            throw new Error('supplier not found');
        }
        return data;
    },
    create(supplier){
        return supplierDao.create(supplier);
    },
    update(supplier){
        supplierDao.getById(supplier.id)
        .then(sup=>{
            supplierDao.update(supplier);
            return supplier;
        })
        .catch(error=>{
            console.log(error);
            throw new Error(error);
        })
    },
    delete(id){
        return supplierDao.delete(id);
    }
}