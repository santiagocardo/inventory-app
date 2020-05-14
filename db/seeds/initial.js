'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')

const orderedTableNames = require('../../src/constants/orderedTableNames')
const countries = require('../../src/constants/countries')

exports.seed = async knex => {
  await Promise.all([
    ...Object
      .keys(orderedTableNames)
      .map(tableName => knex(tableName).del())
  ])

  const password = crypto.randomBytes(15).toString('hex')

  const user = {
    email: 'santiagocardo80@gmail.com',
    name: 'Santiago Cardona',
    password: await bcrypt.hash(password, 12)
  }

  const [createdUser] = await knex(orderedTableNames.user)
    .insert(user)
    .returning('*')

  console.log('User created:', {
    password
  }, createdUser)

  await knex(orderedTableNames.country)
    .insert(countries)

  await knex(orderedTableNames.state)
    .insert([{ name: 'AN' }])
}
