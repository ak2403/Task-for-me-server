const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const _ = require('lodash')
const ProtectedCheck = require('./protectedCheck')
const Users = mongoose.model('users')
const Companies = mongoose.model('companies')
let router = express.Router();

router.post('/registration', (req, res) => {
    let data = req.body;
    return Users.addUser(data)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })

});
















router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    res.send(err);
                }
                const returnUser = {
                    id: user._id,
                    username: user.username,
                    useremail: user.useremail,
                    company: user.company,
                    is_email_verified: user.is_email_verified,
                    is_company_added: user.is_company_added
                }
                const token = jwt.sign(JSON.stringify(returnUser), "123");
                Users.findByIdAndUpdate(user._id, {
                    $push: {
                        tokens: token
                    }
                }, {
                        new: true
                    })
                return res.status(200).json({ token });
            })
        } else {
            return res.status(400).json(info)
        }
    })(req, res, next);
})

router.delete('/logout', ProtectedCheck, (req, res) => {
    if (req.isAuthenticated()) {
        req.logout()
        res.status(403).json({
            message: 'Logout'
        })
    } else {
        res.status(403).json({
            message: 'Login first'
        })
    }
})


router.post('/:userID/add-company', (req, res, next) => {
    const data = req.body

    Companies.findOne({
        name: data.name
    }, (err, company) => {
        if(err){
            console.log(err)
        }
        if (!company) {
            data.created_by = req.params.userID
            const newCompany = new Companies(data)
            newCompany.save()
                .then(company => {
                    Users.findByIdAndUpdate(req.params.userID, {
                        $set: {
                            "company": company._id,
                            "is_company_added": true
                        }
                    }, { new: true }, function (err, user) {
                        if (err){

                        }

                        res.status(200).json(company)
                    })
                })
                .catch(err => {
                    console.log(err)
                    // reject(handleError(err))
                })
        }else{
            res.status(400).json({
                error: 'Comany already registered'
            })
        }
    })
})


module.exports = router;
