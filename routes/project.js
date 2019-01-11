const express = require('express');
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Projects = mongoose.model('projects');
let router = express.Router();

router.post('/:userID/add-project', (req, res) => {
    Projects.addProject(req.body, req.params.userID)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.get('/:userID', (req, res) => {
    Projects.getProject(req.params.userID)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.get('/:userID/:projectID', (req, res) => {
    Projects.getProjectDetail(req.params.userID, req.params.projectID)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.get('/:projectID/members', (req, res) => {
    Projects.getMembers(req.params.projectID)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
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