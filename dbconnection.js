var { Pool } = require("pg");
require("dotenv").config();
var pool = new Pool({

    user: process.env.DBUSER,
    password : process.env.PASSWORD,
    host : process.env.DBSERVER,
    database : process.env.DATABASE,
});

async function dbQuery(vQuery){

    return new Promise((resolve,reject)=>{

        pool.query(vQuery, async (err,result)=>{

            if(err){
                reject(err);   
            }
            else{
                resolve(result);
            }
        })
    })
    
}

module.exports = { dbQuery}