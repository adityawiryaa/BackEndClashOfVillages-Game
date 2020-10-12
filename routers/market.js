const express = require('express')
const dataMarket = express.Router()

const marketControllers = require('../controllers/marketControllers')

const marketAuthorization = require('../middleware/market.Auth')
const userAuthorization = require('../middleware/user.Auth')

dataMarket.post('/market/:userID', userAuthorization, marketControllers.addMarket)
dataMarket.get('/market/list/:userID', userAuthorization, marketControllers.getAllMarkets)
dataMarket.get('/market/:marketID', marketAuthorization, marketControllers.getOneMarket)
dataMarket.get('/market/:marketID/collect', marketAuthorization, marketControllers.collectMarket)
dataMarket.put('/market/:marketID', marketAuthorization, marketControllers.updateMarket)
dataMarket.delete('/market/:marketID', marketAuthorization, marketControllers.deleteOneMarket)

module.exports = dataMarket;