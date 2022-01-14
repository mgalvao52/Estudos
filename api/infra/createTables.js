'use strict'
const modelos = [
    require('../infra/entities/supplier'),
    require('../infra/entities/product')
]

async function createTables(){
    for(let cont = 0;cont < modelos.length;cont++){
        await modelos[cont].sync();

    }
    console.log('tables created succefull')
}

createTables();