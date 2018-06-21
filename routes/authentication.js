const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
        username: data.username
    }).then(resp => {
        if (resp) {
            if (resp.password === data.password) {
                const token = jwt.sign({
                    authName: resp.username
                }, 'aDSDJFNSDKBKSDBGKSDF');

                let getProjects;
                projects.findOne({
                    name: resp.project
                }).then(project => {
                    res.json({
                        isLogged: true,
                        project: project,
                        auth: token
                    });
                })
            } else {
                res.json({
                    isLogged: false,
                    error: 'Invalid password.'
                });
            }
        } else {
            res.json({
                isLogged: false,
                error: 'Invalid username.'
            });
        }
    })
        .catch(e => {
        })
});

module.exports = router;
