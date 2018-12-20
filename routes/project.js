const express = require('express');
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Projects = mongoose.model('projects');
let router = express.Router();

router.post('/add-project', (req, res) => {
    // if (req.isAuthenticated()) {
        const userProps = {
            created_by: req.userData._id,
            company: req.userData.company
        }
        const data = { ...req.body, ...userProps }
        console.log(data, 'addprojects')
        Projects.addProject(data, req.userData)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    // } else {
    //     res.status(403).json({
    //         message: 'Unauthorizated access'
    //     })
    // }
});

router.get('/', (req, res) => {
        const userID = req.userData
        console.log(userID)
        Projects.find({
            created_by: userID._id
        }).then(response => {
            res.status(200).json({
                projects: response
            })
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