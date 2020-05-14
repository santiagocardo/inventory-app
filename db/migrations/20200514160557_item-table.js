'use strict'

const orderedTableNames = require('../../src/constants/orderedTableNames')
const {
  addDefaultColumns,
  references
} = require('../../src/lib/tableUtils')

exports.up = async knex => {
  await Promise.all([
    knex.schema.table(orderedTableNames.state, table =>
      table.string('code', 2)
    ),
    knex.schema.table(orderedTableNames.country, table =>
      table.string('code', 2)
    )
  ])

  await knex.schema.createTable(orderedTableNames.size, table => {
    table.increments()
    table.string('name').notNullable()
    table.float('length')
    table.float('width')
    table.float('height')
    table.float('volume')
    references(table, orderedTableNames.shape)
    addDefaultColumns(table)
  })

  await knex.schema.createTable(orderedTableNames.item, table => {
    table.increments()
    references(table, orderedTableNames.user)
    table.string('name').notNullable()
    references(table, orderedTableNames.item_type)
    table.text('description')
    references(table, orderedTableNames.manufacturer)
    references(table, orderedTableNames.size)
    table.string('sku', 42)
    table.boolean('sparks_joy').defaultTo(true)
    addDefaultColumns(table)
  })
}

exports.down = async knex =>
  await Promise.all([
    knex.schema.table(orderedTableNames.state, table =>
      table.dropColumn('code')
    ),
    knex.schema.table(orderedTableNames.country, table =>
      table.dropColumn('code')
    ),
    knex.schema.dropTable(orderedTableNames.item),
    knex.schema.dropTable(orderedTableNames.size)
  ])
