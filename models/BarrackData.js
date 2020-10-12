const mongoose = require('mongoose')
const Schema = mongoose.Schema

const barrackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    namebarrack: {
        type: String, default: 'User Barrack'
    },
    barrackCreateAt: {
        type: Date, default: Date.now
    },
    lastcollect: {
        type: Date
    }
})

const Barrack = mongoose.model('Barrack', barrackSchema)
module.exports = Barrack