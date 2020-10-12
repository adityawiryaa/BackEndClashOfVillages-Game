const Market = require('../models/MarketData')
const User = require('../models/UserData')

class marketController {

    static async addMarket(req, res, next) {
        const { userID } = req.params
        const { namemarket } = req.body

        const dataUser = await User.findById(userID)
        const resource = dataUser.resource
        const { gold, food } = resource
        if (resource.gold >= 30 && resource.food >= 10) {
            const updateResource = await User.findByIdAndUpdate
                (userID,
                    { $set: { 'resource.gold': gold - 30, 'resource.food': food - 10 } },
                    { new: true })
            const marketData = await Market.create({ user: userID, namemarket })
            res.status(201).send({ success: true, market: marketData, resource: updateResource.resource })
        } else if (resource.gold < 30 || resource.food < 10) next({ name: 'RESOURCE_LESS' })
        else next({ name: 'BUILD_FAILED' })

    }
    static async getAllMarkets(req, res, next) {
        const { userID } = req.params
        const allMarket = await Market.find({ user: userID })
        res.status(200).send({ success: true, data: allMarket })
    }
    static async getOneMarket(req, res, next) {
        const { marketID } = req.params
        const dataMarket = await Market.findById(marketID)
        const { marketCreateAt, lastcollect } = dataMarket
        const timeNow = Date.now(); // Date Now always in millie second

        const collect = lastcollect;
        if (collect == undefined) {
            const marketCreate = Date.parse(marketCreateAt);
            let gold = Math.floor((timeNow - marketCreate) / 60000) // convert to minute
            if (gold >= 20) {
                gold = 20
                res.status(200).send({ success: true, gold, data: dataMarket })
            } else {
                res.status(200).send({ success: true, gold, data: dataMarket })
            }
        } else {
            const dateCollect = Date.parse(lastcollect);
            let gold = Math.floor((timeNow - dateCollect) / 60000) // convert to minute
            if (gold >= 20) {
                gold = 20
                res.status(200).send({ success: true, gold, data: dataMarket })
            } else {
                res.status(200).send({ success: true, gold, data: dataMarket })
            }
        }
    }
    static async collectMarket(req, res, next) {
        const { marketID } = req.params
        const marketData = await Market.findById(marketID)
        const userData = await User.findById(marketData.user)
        const { gold } = userData.resource
        const { marketCreateAt, lastcollect } = marketData
        const timeNow = Date.now();
        const collectDate = new Date()
        const collect = lastcollect;
        if (collect == undefined) {
            const dateFirst = Date.parse(marketCreateAt);
            let userGold = Math.floor((timeNow - dateFirst) / 60000) // convert to minute 1 minute = 1 gold
            if (userGold >= 20) {
                userGold = 20
                const userAddGold = await User.findByIdAndUpdate(marketData.user,
                    { $set: { 'resource.gold': gold + userGold } },
                    { new: true }
                )
                const updateMarket = await Market.findByIdAndUpdate(marketID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource gold add : ' + maxGold, resource: userAddGold.resource })
            } else {
                const userAddGold = await User.findByIdAndUpdate(marketData.user,
                    { $set: { 'resource.gold': gold + userGold } },
                    { new: true }
                )
                const updateMarket = await Market.findByIdAndUpdate(marketID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource gold add ' + userGold, resource: userAddGold.resource })
            }
        } else {
            const dateLast = Date.parse(lastcollect);
            let userGold = Math.floor((timeNow - dateLast) / 60000) // convert to minute
            if (userGold >= 20) {
                userGold = 20
                const userAddGold = await User.findByIdAndUpdate(marketData.user,
                    { $set: { 'resource.gold': gold + userGold } },
                    { new: true }
                )
                const updateMarket = await Market.findByIdAndUpdate(marketID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resouce gold add : ' + userGold, resource: userAddGold.resource })
            } else {
                const resultGold = userGold
                const userAddGold = await User.findByIdAndUpdate(marketData.user,
                    { $set: { 'resource.gold': gold + resultGold } },
                    { new: true }
                )
                const updateMarket = await Market.findByIdAndUpdate(marketID,
                    { $set: { lastcollect: collectDate } },
                    { new: true }
                )
                res.status(200).send({ success: true, msg: 'resource gold add : ' + resultGold, resource: userAddGold.resource })
            }
        }

    }
    static updateMarket(req, res, next) {
        const { namemarket } = req.body
        const { marketID } = req.params

        const marketUpdate = {
            namemarket,
            updateAt: Date.now()
        }
        for (let key in marketUpdate) {
            if (!marketUpdate[key]) delete marketUpdate[key]
        }

        Market.findByIdAndUpdate(marketID, marketUpdate, { new: true })
            .then(result => {
                res.status(201).send({ msg: 'Update success', data: result })
            })
            .catch(next)
    }
    static async deleteOneMarket(req, res, next) {
        await Market.deleteOne({ id: req.params.id })
        res.status(200).send({ success: true, msg: 'Delete Market Success' })
    }
}

module.exports = marketController