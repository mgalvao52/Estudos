'use setrict'
const supplierDao = require('../dao/supplier-dao');
class Supplier{
    constructor({id,company,email,category,createdAt,updatedAt}){
        this.id = id;
        this.company = company;
        this.email = email;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async getList(){
        return await supplierDao.getList();
    }
    async create(){
        const result = {
            company:this.company,
            email:this.email,
            category:this.category
        }
        await supplierDao.create(result);
        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
    async getById(){
        const result = await supplierDao.getById(this.id);
        this.category = result.category;
        this.email = result.email;
        this.company = result.company;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
    async update(){
        const fieldsUpdate = {}
        const fields = ['company','email','category']
        
        fields.forEach(field=>{
            const value = this[field];
            if(typeof value === 'string' && value.length > 0){
                fieldsUpdate[field]=value;
            }
        })
        if(Object.keys(fieldsUpdate).length === 0){
            throw new Error('supplier can not be null');
        }
        fieldsUpdate.id = this.id;
        await supplierDao.update(fieldsUpdate);
        
    }
    async delete(){
        await this.getById();
        await supplierDao.delete(this.id);
    }
}

module.exports = Supplier