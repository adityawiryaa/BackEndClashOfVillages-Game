const jwt = require('jsonwebtoken')

const User = require('../models/UserData')

const userAuthorization = (req, res, next) => {
    const { userID } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'WIRYA')

    User.findById(userID)
        .then((result) => {
            if (result._id == payload.id) next()
            else next({ name: 'DONT_HAVE_ACCESS' })
        })
        .catch(err => { next({ name: 'AUTH_FAILED' }) })
}
module.exports = userAuthorization  