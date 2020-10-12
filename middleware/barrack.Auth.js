const jwt = require('jsonwebtoken')
const barrackAuthorization = (req, res, next) => {
    const { barrackID } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'WIRYA')
    const Barrack = require('../models/BarrackData')

    Barrack.findById(barrackID)
        .then((result) => {
            if (result.user == payload.id) {
                next()
            } else next({ name: 'DONT_HAVE_ACCESS' })
        })
        .catch(err => { next({ name: 'AUTH_FAILED' }) })
}

module.exports = barrackAuthorization