const express = require('express');
const mongoose = require('mongoose');
require('../models/user.js');
require('../models/project.js');

const users = mongoose.model('users');
const Projects = mongoose.model('projects');
let router = express.Router();

router.post('/add-project', (req, res) => {
    if (req.isAuthenticated()) {
        const userProps = {
            created_by: req.session.passport.user
        }
        const data = { ...req.body, ...userProps }
        const newProject = new Projects(data)
        newProject.save()
        res.status(200).json({
            message: 'Project created',
        })
    } else {
        res.status(403).json({
            message: 'Unauthorizated access'
        })
    }
});

router.get('/get-project', (req, res) => {
    if (req.isAuthenticated()) {
        const userID = req.session.passport.user
        Projects.find({
            created_by: userID
        }).then(response => {
            res.status(200).json({
                projects: response
            })
        })
    } else {
        res.status(403).json({
            message: 'Unauthorizated access'
        })
    }
});

router.patch('/edit-project', (req, res) => {
    if (req.isAuthenticated()) {
        const projectData = req.body
        const projectID = projectData.projectID
        delete projectData.projectID
        console.log(projectID)
        Projects.findByIdAndUpdate({ id: projectID }, projectData, function (err, project) {
            console.log(project, err)
        })
    } else {
        res.status(403).json({
            message: 'Unauthorizated access'
        })
    }
})

module.exports = router;