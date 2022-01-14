'use strict'
const Sequelize = require('sequelize')
const instancia = require('../index.js');

const supplier = {

    company:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }

}

const options = {
    freezeTableName:true,
    tableName:"suppliers",
    timestamps:true    
}

module.exports = instancia.define('supplier',supplier,options);