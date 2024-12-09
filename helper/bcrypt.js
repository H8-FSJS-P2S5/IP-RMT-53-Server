const bcrypt = require('bcryptjs');
const saltRaound = 10;

exports.encrypt = async (password) => {
    return await bcrypt.hashSync(password, saltRaound)
}

exports.compare = async (password, hashPassword) => {
    return await bcrypt.compareSync(password, hashPassword)
}