'use strict'
const Sequelize = require('sequelize');
const instancia = require('../index.js')

const product = {
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    supplier:{
        type:Sequelize.INTEGER,
        allowNull:false,
        dependences:{
            model:require('./supplier'),
            key:'id'
        }
    }
}

const options={
    freezeNameTable:true,
    tableName:'products',
    timestamps:true
}

module.exports = instancia.define('product',product,options);
