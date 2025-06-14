const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('absensi', 'root', '@dEPON13127', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize