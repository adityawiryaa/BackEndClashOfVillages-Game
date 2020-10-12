const jwt = require('jsonwebtoken')
const marketAuthorization = (req, res, next) => {
    const { marketID } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'WIRYA')
    const Market = require('../models/MarketData')

    Market.findById(marketID)
        .then((result) => {
            if (result.user == payload.id) {
                next()
            } else next({ name: 'DONT_HAVE_ACCESS' })
        })
        .catch(err => { next({ name: 'AUTH_FAILED' }) })
}

module.exports = marketAuthorization