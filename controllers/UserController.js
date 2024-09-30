const { User } = require('../models')

class UserController {
    
    static async register(req, res, next) {
        const {username, email, password} = req.body
        try {
            const newUser = await User.create({
                username,
                email,
                password
            })

            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = UserController;