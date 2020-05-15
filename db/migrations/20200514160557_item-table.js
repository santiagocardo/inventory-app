'use strict'

const orderedTableNames = require('../../src/constants/orderedTableNames')
const {
  addDefaultColumns,
  url,
  references
} = require('../../src/lib/tableUtils')

exports.up = async knex => {
  await Promise.all([
    knex.schema.table(orderedTableNames.state, table => {
      table.string('code', 2)
      references(table, orderedTableNames.country)
    }),
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
    references(table, orderedTableNames.company)
    references(table, orderedTableNames.size)
    table.string('sku', 42)
    table.boolean('sparks_joy').defaultTo(true)
    addDefaultColumns(table)
  })

  await knex.schema.createTable(orderedTableNames.item_info, table => {
    table.increments()
    references(table, orderedTableNames.user)
    references(table, orderedTableNames.item)
    table.dateTime('purchase_date').notNullable()
    table.dateTime('expiration_date')
    references(table, orderedTableNames.company, false, 'retailer')
    table.dateTime('last_used')
    table.float('purchase_price').notNullable().defaultTo(0)
    table.float('msrp').notNullable().defaultTo(0)
    references(table, orderedTableNames.inventory_location)
    addDefaultColumns(table)
  })

  await knex.schema.createTable(orderedTableNames.item_image, table => {
    table.increments()
    references(table, orderedTableNames.item)
    url(table, 'image_url')
    addDefaultColumns(table)
  })

  await knex.schema.createTable(orderedTableNames.related_item, table => {
    table.increments()
    references(table, orderedTableNames.item)
    references(table, orderedTableNames.item, false, 'related_item')
    addDefaultColumns(table)
  })
}

exports.down = async knex => {
  await Promise.all([
    knex.schema.table(orderedTableNames.state, table => {
      table.dropColumn('code')
      table.dropColumn('country_id')
    }),
    knex.schema.table(orderedTableNames.country, table =>
      table.dropColumn('code')
    )
  ])

  await Promise.all([
    orderedTableNames.size,
    orderedTableNames.item,
    orderedTableNames.item_info,
    orderedTableNames.item_image,
    orderedTableNames.related_item
  ].reverse().map(tableName => knex.schema.dropTableIfExists(tableName)))
}
