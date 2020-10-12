const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        default: 'Player'
    },
    townhall: { type: String, default: 'Player' },
    resource: {
        gold: { type: Number, max: 1000, default: 100 },
        food: { type: Number, max: 1000, default: 100 },
        soldier: { type: Number, max: 500, default: 0 }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    medal: { type: Number, default: 0 },
    createAt: Date,
    updateAt: Date,
})

userSchema.pre('save', function (next) {
    DataUser.findOne({ email: this.email })
        .then((user) => {
            if (user) next({ name: 'ALREADY_EXIST' })
            else {
                const salt = bcrypt.genSaltSync(10)
                this.password = bcrypt.hashSync(this.password, salt)
                next()
            }
        })
        .catch(next)
})

const DataUser = mongoose.model('User', userSchema)

module.exports = DataUser