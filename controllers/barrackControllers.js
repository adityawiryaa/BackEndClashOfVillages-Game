const Barrack = require('../models/BarrackData')
const User = require('../models/UserData')

class barrackController {

    static async addBarrack(req, res, next) {
        const { userID } = req.params
        const { namebarrack } = req.body

        const dataUser = await User.findById(userID)
        const dataBarrack = await Barrack.find({ user: userID })
        const resource = dataUser.resource
        const { gold, food } = resource

        if (resource.gold >= 30 && resource.food >= 30) {
            if (dataBarrack.length <= 30) {
                const updateResource = await User.findByIdAndUpdate
                    (userID,
                        { $set: { 'resource.gold': gold - 30, 'resource.food': food - 30 } },
                        { new: true })
                const barrackData = await Barrack.create({ user: userID, namebarrack })
                res.status(201).send({ success: true, barrack: barrackData, resource: updateResource.resource })
            } else next({ name: 'BARRACK_FAILED' })

        } else if (resource.gold < 30 || resource.food < 30) next({ name: 'RESOURCE_LESS' })
        else next({ name: 'BUILD_FAILED' })

    }
    static async getAllBarracks(req, res, next) {
        const { userID } = req.params
        const allBarrack = await Barrack.find({ user: userID })
        res.status(200).send({ success: true, data: allBarrack })
    }
    static async getOneBarrack(req, res, next) {
        const { barrackID } = req.params
        const dataBarrack = await Barrack.findById(barrackID)
        const { barrackCreateAt, lastcollect } = dataBarrack
        const timeNow = Date.now(); // Date Now always in millie second

        const collect = lastcollect;
        if (collect == undefined) {
            const date = Date.parse(barrackCreateAt);
            let soldier = Math.floor((timeNow - date) / 60000) // convert to minute
            if (soldier >= 10) {
                soldier = 10
                res.status(200).send({ success: true, soldier: soldier, data: dataBarrack })
            } else {
                res.status(200).send({ success: true, soldier: soldier, data: dataBarrack })
            }
        } else {
            const date = Date.parse(lastcollect);
            let soldier = Math.floor((timeNow - date) / 600) // convert to minute
            if (soldier >= 10) {
                soldier = 10
                res.status(200).send({ success: true, soldier: soldier, data: dataBarrack })
            } else {
                res.status(200).send({ success: true, soldier: soldier, data: dataBarrack })
            }
        }
    }
    static async collectBarrack(req, res, next) {
        const { barrackID } = req.params
        const barrackData = await Barrack.findById(barrackID)
        const userData = await User.findById(barrackData.user)
        const { soldier } = userData.resource
        const { barrackCreateAt, lastcollect } = barrackData
        const timeNow = Date.now();
        const collectDate = new Date()

        const collect = lastcollect;
        if (collect == undefined) {
            const dateFirst = Date.parse(barrackCreateAt);
            let userSoldier = Math.floor((timeNow - dateFirst) / 60000) // convert to minute 1 minute = 1 soldier
            if (userSoldier >= 10) {
                userSoldier = 10
                const userAddSoldier = await User.findByIdAndUpdate(barrackData.user,
                    { $set: { 'resource.soldier': soldier + userSoldier } },
                    { new: true }
                )
                const updateBarrack = await Barrack.findByIdAndUpdate(barrackID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource soldier add : ' + userSoldier, resource: userAddSoldier.resource })
            } else {
                const userAddSoldier = await User.findByIdAndUpdate(barrackData.user,
                    { $set: { 'resource.soldier': soldier + userSoldier } },
                    { new: true }
                )
                const updateBarrack = await Barrack.findByIdAndUpdate(barrackID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource soldier add ' + userSoldier, resource: userAddSoldier.resource })
            }
        } else {
            const dateLast = Date.parse(lastcollect);
            let userSoldier = Math.floor((timeNow - dateLast) / 60000) // convert to minute
            if (userSoldier >= 10) {
                userSoldier = 10
                const userAddSoldier = await User.findByIdAndUpdate(barrackData.user,
                    { $set: { 'resource.soldier': soldier + userSoldier } },
                    { new: true }
                )
                const updateBarrack = await Barrack.findByIdAndUpdate(barrackID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resouce soldier add : ' + userSoldier, resource: userAddSoldier.resource })
            } else {
                const userAddSoldier = await User.findByIdAndUpdate(barrackData.user,
                    { $set: { 'resource.soldier': soldier + userSoldier } },
                    { new: true }
                )
                const updateBarrack = await Barrack.findByIdAndUpdate(barrackID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource soldier add : ' + userSoldier, resource: userAddSoldier.resource })
            }
        }

    }
    static updateBarrack(req, res, next) {
        const { namebarrack } = req.body
        const { barrackID } = req.params

        const barrackUpdate = {
            namebarrack,
            updateAt: Date.now()
        }
        for (let key in barrackUpdate) {
            if (!barrackUpdate[key]) delete barrackUpdate[key]
        }
        Barrack.findByIdAndUpdate(barrackID, barrackUpdate, { new: true })
            .then(result => {
                res.status(201).send({ msg: 'Update success', data: result })
            })
            .catch(next)
    }
    static async deleteOneBarrack(req, res, next) {
        await Barrack.deleteOne({ id: req.params.id })
        res.status(200).send({ success: true, msg: 'Delete Barrack Success' })
    }
}

module.exports = barrackController