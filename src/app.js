'use strict'

const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const pino = require('pino-http')

const api = require('./api')
const {
  notFoundHandler,
  logErrors,
  wrapErrors,
  errorHandler
} = require('./middlewares/errorHandlers')
const { message } = require('./constants/project')

const app = express()

app.use(pino({ prettyPrint: true }))
app.use(express.json())
app.use(compression())
app.use(helmet())

app.get('/', (req, res) => res.json({ message }))

app.use('/api/v1', api)

app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

module.exports = app
