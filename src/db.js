'use strict'

const knex = require('knex')

const config = require('../config')
const knexConfig = require('../knexfile')

const enviroment = config.enviroment
const connectionConfig = knexConfig[enviroment]
const connection = knex(connectionConfig)

module.exports = connection
