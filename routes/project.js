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

router.get('/:userID', (req, res) => {
    Projects.getProject(req.params.userID)
        .then(response => {
            res.status(200).json(response)
        })
        // Projects.find({
        //     created_by: req.params.userID
        // }, function(err, projects){
            
        //     if(err){
        //         console.log(err)
        //         return res.json({status: 400, error: err})
        //     }
        //     // let returnObject = {
        //     //     projects: projects
        //     // }

        //     // res.status(200).json(returnObject)

        // })
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