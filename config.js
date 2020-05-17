'use strict'

require('dotenv').config()

const config = {
  enviroment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  dbClient: process.env.DB_CLIENT,
  dbTestName: process.env.POSTGRES_TEST_DB
}

module.exports = config
