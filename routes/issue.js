const express = require('express');
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Projects = mongoose.model('projects');
const Issues = mongoose.model('issues');
let router = express.Router();

router.post('/:userID/add-issue', (req, res) => {
    return Issues.addIssue(req.body, req.params.userID)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

router.get('/:userID', (req, res) => {
    return Issues.getIssue(req.params.userID)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

module.exports = router;