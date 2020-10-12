const express = require('express')
const dataFarm = express.Router()

const farmControllers = require('../controllers/farmControllers')

const farmAuthorization = require('../middleware/farm.Auth')
const userAuthorization = require('../middleware/user.Auth')

dataFarm.post('/farm/:userID', userAuthorization, farmControllers.addFarm)
dataFarm.get('/farm/list/:userID', userAuthorization, farmControllers.getAllFarms)
dataFarm.get('/farm/:farmID', farmAuthorization, farmControllers.getOneFarm)
dataFarm.get('/farm/:farmID/collect', farmAuthorization, farmControllers.collectFarm)
dataFarm.put('/farm/:farmID', farmAuthorization, farmControllers.updateFarm)
dataFarm.delete('/farm/:farmID', farmAuthorization, farmControllers.deleteOneFarm)

module.exports = dataFarm;