'use scrit'

const orderedTableNames = require('../../src/constants/orderedTableNames')

function addDefaultColumns (table) {
  table.timestamps(false, true)
  table.datetime('deleted_at')
}

function createNameTable (knex, tableName) {
  return knex.schema.createTable(tableName, table => {
    table.increments().notNullable()
    table.string('name').notNullable().unique()
    addDefaultColumns(table)
  })
}

function url (table, columnName) {
  table.string(columnName, 2000)
}

function email (table, columnName) {
  return table.string(columnName, 254)
}

function references (table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade')
}

exports.up = async knex => {
  await Promise.all([
    knex.schema.createTable(orderedTableNames.user, table => {
      table.increments().notNullable()
      email(table, 'email').notNullable().unique()
      table.string('name').notNullable()
      table.string('password', 127).notNullable()
      table.datetime('last_login')
      addDefaultColumns(table)
    }),
    createNameTable(knex, orderedTableNames.item_type),
    createNameTable(knex, orderedTableNames.country),
    createNameTable(knex, orderedTableNames.state),
    createNameTable(knex, orderedTableNames.shape),
    knex.schema.createTable(orderedTableNames.location, table => {
      table.increments().notNullable()
      table.string('name').notNullable().unique()
      table.string('description', 1000)
      url(table, 'image_url')
      addDefaultColumns(table)
    })
  ])

  await knex.schema.createTable(orderedTableNames.address, table => {
    table.increments().notNullable()
    table.string('street_address_1', 50).notNullable()
    table.string('street_address_2', 50)
    table.string('city', 50).notNullable()
    table.string('zipcode', 5).notNullable()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    references(table, 'state')
    references(table, 'country')
  })

  await knex.schema.createTable(orderedTableNames.manufacturer, table => {
    table.increments().notNullable()
    table.string('name').notNullable()
    url(table, 'logo_url')
    table.string('description', 1000)
    url(table, 'website_url')
    email(table, 'email')
    references(table, 'address')
  })
}

exports.down = async knex => {
  await Promise.all([
    orderedTableNames.manufacturer,
    orderedTableNames.address,
    orderedTableNames.user,
    orderedTableNames.item_type,
    orderedTableNames.country,
    orderedTableNames.state,
    orderedTableNames.shape,
    orderedTableNames.location
  ].map(tableName => knex.schema.dropTable(tableName)))
}
