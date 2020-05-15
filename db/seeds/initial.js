'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')

const orderedTableNames = require('../../src/constants/orderedTableNames')
const getData = require('../../src/lib/getCvsData')

exports.seed = async knex => {
  await Promise.all([
    Object
      .keys(orderedTableNames)
      .map(tableName => knex(tableName).del())
  ])

  const password = crypto.randomBytes(15).toString('hex')

  const user = {
    email: 'santiagocardo80@gmail.com',
    name: 'Santiago Cardona',
    password: await bcrypt.hash(password, 12)
  }

  const [createdUser] = await knex(orderedTableNames.user).insert(user, '*')

  console.log('User created:', { password }, createdUser)

  const countries = getData('countries')
  const insertedCountries = await knex(orderedTableNames.country).insert(countries, '*')
  const usa = insertedCountries.find(country => country.code === 'US')

  const usStates = getData('us_states')
  const mappedUsStates = usStates.map(state => ({
    ...state, country_id: usa.id
  }))

  await knex(orderedTableNames.state).insert(mappedUsStates)
}
