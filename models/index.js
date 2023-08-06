const dbConfig = require("../config/dbConfig");

const {Sequelize,DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("../models/products.js")(sequelize,DataTypes);
db.category = require("../models/category.js")(sequelize,DataTypes);
db.user = require("../models/user.js")(sequelize,DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
});

db.category.hasMany(db.products, {
    foreignKey: 'CategoryID',
    as: 'products'
});

db.products.belongsTo(db.category, {
    foreignKey: 'CategoryID',
    as: 'category'
});

module.exports = db;
