const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    namemarket: {
        type: String, default: 'User Market'
    },
    marketCreateAt: {
        type: Date, default: Date.now
    },
    lastcollect: {
        type: Date
    }
})

const Market = mongoose.model('Market', marketSchema)
module.exports = Market