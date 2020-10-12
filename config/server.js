const mongoose = require('mongoose')

module.exports = () => {
    const gameServer = `mongodb://localhost/GameSystems`
    mongoose.connect(gameServer, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    const db = mongoose.connection
    db.once('open', () => {
        console.log('connect mongoose on', gameServer)
    })
}