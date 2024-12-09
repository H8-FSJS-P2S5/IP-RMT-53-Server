let { Art } = require("../models")

async function Admin(req, res, next) {
    try {
        let art = await Art.findByPk(req.params.id)
        if (!art) {
            throw { name: "Not Found", message: "Data Not Found" }
        }

        if (req.user.role !== "Admin") {
            if (art.UserId !== req.user.id) {
                throw { name: "Forbidden", message: "You are not Authorized" }
            }
        }
        next()
    } catch (err) {
        next(err)
    }
}

async function Member(req, res, next) {
    try {
        let art = await Art.findByPk(req.params.id)
        if (!art) {
            throw { name: "Not Found", message: "Data Not Found" }
        }

        if (req.user.role !== "Member") {
            if (art.UserId !== req.user.id) {
                throw { name: "Forbidden", message: "You are not Authorized" }
            }
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    Admin, Member
}