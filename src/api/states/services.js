'use srict'

const boom = require('@hapi/boom')

const statesQueries = require('./queries')

const find = async (req, res) => {
  const states = await statesQueries.find()
  return res.json(states)
}

const get = async (req, res, next) => {
  const id = +req.params.id
  if (isNaN(id)) { return next(boom.badRequest('Invalid ID')) }

  const state = await statesQueries.get(id)
  if (!state) { return next() }

  return res.json(state)
}

module.exports = {
  find,
  get
}
