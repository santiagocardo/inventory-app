'use strict'

const db = require('../../db')
const tableNames = require('../../constants/orderedTableNames')

const fields = ['id', 'name', 'code']

const find = async () => db(tableNames.state).select(fields)
const get = async id => db(tableNames.state).select(fields).where({ id }).first()

module.exports = {
  find,
  get
}
