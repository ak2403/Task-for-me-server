const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Users = mongoose.model('users')

module.exports = (req, res, next) => {
    try {
        const authToken = req.headers.authorization.split(' ')[1]
        const getUser = jwt.verify(authToken, "123")
        
        Users.findOne({
            _id: getUser._id
        }, function(err, resp){
            if(err || !resp){
                const error_message = new Error(err)
                res.status(400).json(error_message)
            }
            req.userData = resp
            next()
        })

        // Users.findOne({ _id: ObjectId(getUser._id) })
        //     .then(res => {
        //         console.log(res)
        //         req.userData = res
        //         next()
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         res.status(400).json({
        //             message: 'Invalid User'
        //         })
        //     })
    }
    catch (err) {
        res.status(400).json({
            message: 'Invalid JSON'
        })
    }
}