'use setrict'
class Supplier{
    constructor({id,company,email,category}){
        this.id = id;
        this.company = company;
        this.email = email;
        this.category = category;
    }
}

module.exports = Supplier