const { Origin } = require('../models')

exports.OriginAll = async (req, res, next) => {
    try {
        let origin = await Origin.findAll()
        if (!origin) {
            throw { name: "Not Found", message: "Data Not Found" }
        }
        res.status(200).json({ message: "Success", data:origin })
    } catch (err) {
        next(err)
    }
}

exports.OriginCreate = async (req, res, next) => {
    let { name } = req.body
    try {
        if (!name) {
            throw { name: "Bad Request", message: "Please input something" }
        }
        let data = await Origin.create({ name })
        res.status(201).json({ message: "Data has been created", data : data })
    } catch (err) {
        next(err)
    }
}

exports.OriginUpdate = async (req, res, next) => {
    let { id } = req.params
    try {
        let data = await Origin.findByPk(id)
        if (!data) {
            throw { name: "Not Found", message: "Dat Not Found" }
        }

        await data.update(req.body)
        res.status(200).json({ message: "Origin han been updated", data:data })
    } catch (err) {
        next(err)
    }
}