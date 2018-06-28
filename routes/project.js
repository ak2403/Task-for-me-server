const express = require('express');
const mongoose = require('mongoose');
require('../models/user.js');
require('../models/project.js');

const users = mongoose.model('users');
const projects = mongoose.model('projects');
let router = express.Router();

router.post('/add-project', (req, res) => {
    projects.findByIdAndUpdate(req.body.mainProject, {
        $push: {
            "subProject": {
                name: req.body.name,
                code: req.body.code
            }
        }
    }, {
            new: true
        }, function (err, res) {
            console.log(res)
        })
});

router.post('/get-sub-project', (req, res) => {
    users.findOne({ username: req.body.name })
        .then(resp => {
            projects.findOne({ name: resp.project })
                .then(project => {
                    res.json({
                        project: project
                    })
                })
        })
});

module.exports = router;