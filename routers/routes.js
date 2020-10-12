const express = require('express')
const approute = express.Router()
const userRoutes = require('./user')
const marketRoutes = require('./market')
const farmRoutes = require('./farm')
const barrackRoutes = require('./barrack')
const errorHandlers = require('../middleware/errorHandlers')

approute.use('/user', userRoutes)
approute.use('/user', marketRoutes)
approute.use('/user', farmRoutes)
approute.use('/user', barrackRoutes)
approute.use(errorHandlers)

module.exports = approute