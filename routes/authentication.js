const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const _ = require('lodash')
const Users = mongoose.model('users')
const Companies = mongoose.model('companies')
let router = express.Router();

router.post('/registration', (req, res) => {
    let data = req.body;
    return Users.addUser(data)
        .then(response => {
            res.status(200).json(response)
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
                const token = jwt.sign(user.toJSON(), 'asdasdasdasdasd');
                return res.status(200).json({ token });
            })
        } else {
            return res.status(400).json(info)
        }
    })(req, res, next);
})

router.post('/logout', (req, res) => {
    req.logout()
    res.status(403)
})

router.post('/add-company', (req, res) => {
    const data = req.body
    return Companies.addCompany(data)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// router.get('/authrequired', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.send('you hit the authentication endpoint\n')
//     } else {
//         res.redirect('/')
//     }
// })


module.exports = router;
