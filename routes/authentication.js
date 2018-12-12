const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const _ = require('lodash')
const Users = mongoose.model('users')
let router = express.Router();
const LocalStrategy = require('passport-local').Strategy

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

router.patch('/add-company', (req, res) => {
    console.log(req.isAuthenticated())
    return res.json({})
})

// router.get('/authrequired', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.send('you hit the authentication endpoint\n')
//     } else {
//         res.redirect('/')
//     }
// })


module.exports = router;
