'use strict'

const boom = require('@hapi/boom')

const config = require('../../config')

function notFoundHandler (req, res) {
  const {
    output: { statusCode, payload }
  } = boom.notFound()

  res.status(statusCode).json(payload)
}

function withErrorStack (error, stack) {
  if (config.enviroment !== 'production') {
    return { error, stack }
  }
  return error
}

function logErrors (err, req, res, next) {
  req.log.error(err)
  next(err)
}

function wrapErrors (err, req, res, next) {
  !err.isBoom ? next(boom.badImplementation(err)) : next(err)
}

function errorHandler (err, req, res, next) {
  const { output: { statusCode, payload } } = err

  res.status(statusCode)
  res.json(withErrorStack(payload, err.stack))
}

module.exports = {
  notFoundHandler,
  logErrors,
  wrapErrors,
  errorHandler
}
