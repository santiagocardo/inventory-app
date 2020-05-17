'use strict'

const config = require('./config')

module.exports = {
  development: {
    debug: true,
    client: config.dbClient,
    connection: {
      database: config.dbName,
      user: config.dbUser,
      password: config.dbPassword
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  test: {
    client: config.dbClient,
    connection: {
      database: config.dbTestName,
      user: config.dbUser,
      password: config.dbPassword
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
