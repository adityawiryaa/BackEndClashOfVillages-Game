const User = require('../models/UserData')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static register(req, res, next) {
        const { username, email, password } = req.body

        User.create({
            email,
            password,
            username,
            townhall: username,
            createAt: Date.now()
        })
            .then((result) => {
                res.status(201).send({ success: true, data: result })
            })
            .catch(err => { res.status(500).send(err) })
    }
    static getOneUser(req, res, next) {
        const { userID } = req.params
        User.findById(userID)
            .then((result) => {
                res.status(200).send({ success: true, data: result })
            })
            .catch(next)
    }
    static updateUser(req, res, next) {
        const { username, townhall } = req.body
        const { userID } = req.params

        const userUpdate = {
            username,
            townhall,
            updateAt: Date.now()
        }
        for (let key in userUpdate) {
            if (!userUpdate[key]) delete userUpdate[key]
        }

        User.findByIdAndUpdate(userID, userUpdate, { new: true })
            .then(result => {
                res.status(201).send({ msg: 'Update success', data: result })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(async (data) => {
                const isTrue = await bcrypt.compare(password, data.password)
                if (data && isTrue) {
                    const payload = { id: data.id }
                    const token = jwt.sign(payload, "WIRYA")
                    if (!token) next({ name: 'NOT_FOUND' })
                    res.status(200).send({ success: true, Player_id: data.id, token: token })
                } else next({ name: 'LOGIN_FAILED' })
            })
            .catch(err => { next({ name: 'NOT_FOUND' }) })
    }
    static async attackPlayer(req, res, next) {
        const { userID } = req.params
        const { enemyID } = req.params
        const { soldierattack } = req.body
        const user = await User.findById(userID)
        const enemy = await User.findById(enemyID)
        const { soldier, gold, food } = user.resource
        const { medal } = user
        const medalEnemy = enemy.medal
        const enemyGold = enemy.resource.gold
        const enemyFood = enemy.resource.food
        const soldierEnemy = enemy.resource.soldier
        const arr = [];
        for (let i = 0; i < 3; i++) {
            arr.push(Math.random() < (soldierattack / (soldierEnemy + 1)))
        }
        const resultAttack = arr.filter(el => el).length
        if (resultAttack >= 2) {
            if (soldierattack <= soldier && soldierEnemy >= 50) {
                const successAttack = await User.findByIdAndUpdate(userID,
                    { $set: { medal: medal + 5, 'resource.soldier': soldier - parseInt(soldierattack), 'resource.gold': gold + parseInt(enemyGold / 2), 'resource.food': food + parseInt(enemyFood / 2) } },
                    { new: true }
                )
                const enemyUpdate = await User.findByIdAndUpdate(enemyID,
                    { $set: { 'resource.soldier': 0, 'resource.gold': enemyGold - parseInt(enemyGold / 2), 'resource.food': enemyFood - parseInt(enemyFood / 2) } },
                    { new: true }
                )
                res.status(200).send({ msg: 'Attack Success, You Win and Get Rewards', reward: { gold: enemyGold / 2, food: enemyFood / 2, medal: 5 }, resource: successAttack.resource, medal: successAttack.medal })
            } else next({ name: 'SOLDIER_ENEMY_LESS' })
        } else {
            const successAttack = await User.findByIdAndUpdate(userID,
                { $set: { medal: Math.floor(medal / 2), 'resource.soldier': soldier - parseInt(soldierattack) } },
                { new: true }
            )
            const enemyUpdate = await User.findByIdAndUpdate(enemyID,
                { $set: { medal: medalEnemy + 2, 'resource.soldier': soldierEnemy - 20 } },
                { new: true }
            )
            res.status(200).send({ msg: 'Attack Success & You Lose, ', yourresource: successAttack.resource, medal: successAttack.medal })
        }
    }
}
module.exports = userController;