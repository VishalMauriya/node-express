const Sequelize = require('sequelize');

const sequelize = new Sequelize('testing', 'root', 'vishal1234', {
    dialect:'mysql',
    host: 'localhost',
})

module.exports = sequelize;





//using sql2

// const mysql2 = require('mysql2')

// const pool = mysql2.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'testing',
//     password: 'vishal1234'
// })

// module.exports = pool.promise();