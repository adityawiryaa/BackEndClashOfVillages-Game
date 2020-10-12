const Farm = require('../models/FarmData')
const User = require('../models/UserData')

class farmController {

    static async addFarm(req, res, next) {
        const { userID } = req.params
        const { namefarm } = req.body

        const dataUser = await User.findById(userID)
        const resource = dataUser.resource
        const { gold, food } = resource
        if (resource.gold >= 10 && resource.food >= 30) {
            const updateResource = await User.findByIdAndUpdate
                (userID,
                    { $set: { 'resource.gold': gold - 10, 'resource.food': food - 30 } },
                    { new: true })
            const farmData = await Farm.create({ user: userID, namefarm })
            res.status(201).send({ success: true, farm: farmData, resource: updateResource.resource })
        } else if (resource.gold < 10 || resource.food < 30) next({ name: 'RESOURCE_LESS' })
        else next({ name: 'BUILD_FAILED' })

    }
    static async getAllFarms(req, res, next) {
        const { userID } = req.params
        const allFarm = await Farm.find({ user: userID })
        res.status(200).send({ success: true, data: allFarm })
    }
    static async getOneFarm(req, res, next) {
        const { farmID } = req.params
        const dataFarm = await Farm.findById(farmID)
        const { farmCreateAt, lastcollect } = dataFarm
        const timeNow = Date.now(); // Date Now always in millie second
        const collect = lastcollect;
        if (collect == undefined) {
            const date = Date.parse(farmCreateAt);
            let food = Math.floor((timeNow - date) / 60000) // convert to minute
            if (food >= 20) {
                food = 20
                res.status(200).send({ success: true, food, data: dataFarm })
            } else {
                res.status(200).send({ success: true, food, data: dataFarm })
            }
        } else {
            const date = Date.parse(lastcollect);
            let food = Math.floor((timeNow - date) / 60000) // convert to minute
            if (food >= 20) {
                food = 20
                res.status(200).send({ success: true, food, data: dataFarm })
            } else {
                res.status(200).send({ success: true, food, data: dataFarm })
            }
        }
    }
    static async collectFarm(req, res, next) {
        const { farmID } = req.params
        const farmData = await Farm.findById(farmID)
        const userData = await User.findById(farmData.user)
        const { food } = userData.resource
        const { farmCreateAt, lastcollect } = farmData
        const timeNow = Date.now();
        const collectDate = new Date()

        const collect = lastcollect;
        if (collect == undefined) {
            const dateFirst = Date.parse(farmCreateAt);
            let userFood = Math.floor((timeNow - dateFirst) / 60000) // convert to minute 1 minute = 1 resource
            if (userFood >= 20) {
                userFood = 20
                const userAddFood = await User.findByIdAndUpdate(farmData.user,
                    { $set: { 'resource.food': food + userFood } },
                    { new: true }
                )
                const updateFood = await Farm.findByIdAndUpdate(farmID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource food add : ' + userFood, resource: userAddFood.resource })
            } else {
                const userAddFood = await User.findByIdAndUpdate(farmData.user,
                    { $set: { 'resource.food': food + userFood } },
                    { new: true }
                )
                const updateFarm = await Farm.findByIdAndUpdate(farmID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource food add ' + userFood, resource: userAddFood.resource })
            }
        } else {
            const dateLast = Date.parse(lastcollect);
            let userFood = Math.floor((timeNow - dateLast) / 60000) // convert to minute
            if (userFood >= 20) {
                userFood = 20
                const userAddFood = await User.findByIdAndUpdate(farmData.user,
                    { $set: { 'resource.food': food + userFood } },
                    { new: true }
                )
                const updateFarm = await Farm.findByIdAndUpdate(farmID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resouce food add : ' + userFood, resource: userAddFood.resource })
            } else {
                const userAddFood = await User.findByIdAndUpdate(farmData.user,
                    { $set: { 'resource.food': food + userFood } },
                    { new: true }
                )
                const updateFarm = await Farm.findByIdAndUpdate(farmID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource food add : ' + userFood, resource: userAddFood.resource })
            }
        }

    }
    static updateFarm(req, res, next) {
        const { namefarm } = req.body
        const { farmID } = req.params

        const farmUpdate = {
            namefarm,
            updateAt: Date.now()
        }
        for (let key in farmUpdate) {
            if (!farmUpdate[key]) delete farmUpdate[key]
        }

        Farm.findByIdAndUpdate(farmID, farmUpdate, { new: true })
            .then(result => {
                res.status(201).send({ msg: 'Update success', data: result })
            })
            .catch(next)
    }
    static async deleteOneFarm(req, res, next) {
        await Farm.deleteOne({ id: req.params.id })
        res.status(200).send({ success: true, msg: 'Delete Farm Success' })
    }
}

module.exports = farmController