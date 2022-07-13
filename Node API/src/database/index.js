const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Perfil = require('../models/Perfil')
const Usuario = require('../models/Usuario')

Usuario.init(connection);
Perfil.init(connection);

module.exports = connection;