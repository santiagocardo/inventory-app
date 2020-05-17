'use strict'

const express = require('express')

const router = express.Router()
const statesSevices = require('./services')
const catchErrors = require('../../utils/catchErrors')

router.get('/', catchErrors(statesSevices.find))
router.get('/:id', catchErrors(statesSevices.get))

module.exports = router
