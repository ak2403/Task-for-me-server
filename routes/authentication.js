const express = require('express');
const mongoose = require('mongoose');
require('../models/user.js');
require('../models/project.js');

const users = mongoose.model('users');
const projects = mongoose.model('projects');
let router = express.Router();

router.post('/registration', (req, res) => {
    let data = req.body;
    let createUser = new users(req.body);
    createUser.save()
        .then(savedRes => {
            let createProject = new projects({
                name: req.body.project,
                admin: req.body.username,
                users: []
            });
            createProject.save()
                .then((projectRes) => {
                    res.json({
                        
                    })
                });
        })
});

router.post('/login', (req, res) => {
    let data = req.body;
    users.findOne({
        username: req.body.username
    }).then(resp=>{
        console.log(resp)
    })
});

module.exports = router;
