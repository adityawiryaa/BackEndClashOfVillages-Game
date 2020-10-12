const express = require('express')
const dataMBarrack = express.Router()

const barrackControllers = require('../controllers/barrackControllers')

const barrackAuthorization = require('../middleware/barrack.Auth')
const userAuthorization = require('../middleware/user.Auth')

dataMBarrack.post('/barrack/:userID', userAuthorization, barrackControllers.addBarrack)
dataMBarrack.get('/barrack/list/:userID', userAuthorization, barrackControllers.getAllBarracks)
dataMBarrack.get('/barrack/:barrackID', barrackAuthorization, barrackControllers.getOneBarrack)
dataMBarrack.get('/barrack/:barrackID/collect', barrackAuthorization, barrackControllers.collectBarrack)
dataMBarrack.put('/barrack/:barrackID', barrackAuthorization, barrackControllers.updateBarrack)
dataMBarrack.delete('/barrack/:barrackID', barrackAuthorization, barrackControllers.deleteOneBarrack)

module.exports = dataMBarrack;