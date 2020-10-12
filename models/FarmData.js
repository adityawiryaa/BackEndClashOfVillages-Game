const mongoose = require('mongoose')
const Schema = mongoose.Schema

const farmSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    namefarm: {
        type: String, default: 'User Farm'
    },
    farmCreateAt: {
        type: Date, default: Date.now
    },
    lastcollect: {
        type: Date
    }
})

const Farm = mongoose.model('Farm', farmSchema)
module.exports = Farm