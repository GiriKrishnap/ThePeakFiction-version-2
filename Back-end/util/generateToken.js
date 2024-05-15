const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10h"
    })
}

module.exports = generateToken