const express = require('express')
const dataUser = express.Router()

const userControllers = require('../controllers/userControllers')
const userAuthorization = require('../middleware/user.Auth')

dataUser.post('/signup', userControllers.register)
dataUser.post('/signin', userControllers.login)
dataUser.get('/:userID', userAuthorization, userControllers.getOneUser)
dataUser.put('/:userID', userAuthorization, userControllers.updateUser)
dataUser.post('/:userID/attack/:enemyID', userAuthorization, userControllers.attackPlayer)

module.exports = dataUser