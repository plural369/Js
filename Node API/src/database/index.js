const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Perfil = require('../models/perfil')
const Usuario = require('../models/usuario')

Perfil.init(connection);
Usuario.init(connection);

module.exports = connection;