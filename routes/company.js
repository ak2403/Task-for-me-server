const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const _ = require('lodash')
const ProtectedCheck = require('./protectedCheck')
const Users = mongoose.model('users')
const Companies = mongoose.model('companies')
const Mailrequest = require('./invites/mail-router')
let router = express.Router();

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
                        const returnUser = {
                            id: user._id,
                            username: user.username,
                            useremail: user.useremail,
                            company: user.company,
                            is_email_verified: user.is_email_verified,
                            is_company_added: user.is_company_added
                        }
                        const token = jwt.sign(JSON.stringify(returnUser), "123");

                        res.status(200).json({token})
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

router.post('/:userID/invite-members', (req, res) => {
    Mailrequest(req.body.members)
    // return res.status(200)
    // return Companies.getCompany(req.params.userID)
    //     .then(response => {
    //         res.status(200).json(response)
    //     })
    //     .catch(err => {
    //         res.status(400).json(err)
    //     })
})

router.get('/:userID', (req, res) => {
    return Companies.getCompany(req.params.userID)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})


module.exports = router;
