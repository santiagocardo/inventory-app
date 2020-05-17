'use strict'

const express = require('express')

const router = express.Router()
const { message } = require('../constants/project')

router.get('/', (req, res) => res.json({ message }))
router.use('/states', require('./states/routes'))

module.exports = router
