const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Users = mongoose.model('users')

module.exports = (req, res, next) => {
    try {
        const authToken = req.headers.authorization.split(' ')[1]
        const getUser = jwt.verify(authToken, "123")
        Users.findById(getUser._id)
            .then(res => {
                req.userData = res
                next()
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Invalid User'
                })
            })
    }
    catch (err) {
        res.status(400).json({
            message: 'Invalid JSON'
        })
    }
}