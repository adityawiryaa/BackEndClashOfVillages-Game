const jwt = require('jsonwebtoken')
const farmAuthorization = (req, res, next) => {
    const { farmID } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'WIRYA')
    const Farm = require('../models/FarmData')

    Farm.findById(farmID)
        .then((result) => {
            if (result.user == payload.id) {
                next()
            } else next({ name: 'DONT_HAVE_ACCESS' })
        })
        .catch(err => { next({ name: 'AUTH_FAILED' }) })
}

module.exports = farmAuthorization