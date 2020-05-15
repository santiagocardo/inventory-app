'use strict'

const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const pipe = (...fns) => v => {
  for (const fn of fns) {
    v = fn(v)
  }
  return v
}

const compose = (...fns) => pipe(...fns.reverse())

/** ****************************** */

const readFile = filename => fs.readFileSync(path.join(__dirname, `../../db/sources/${filename}.csv`), 'utf8')
const parseData = csvData => Papa.parse(csvData, {
  header: true
})
const mapData = ({ data }) =>
  data.map(({ name, code }) => ({
    name,
    code
  }))

const getData = compose(mapData, parseData, readFile)

module.exports = filename => getData(filename)
