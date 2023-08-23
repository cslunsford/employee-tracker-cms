const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Successfully connected to database.');
    })
    .catch(err => {
        console.error('Database connection unsuccessful.', err);
    });

module.exports = sequelize;