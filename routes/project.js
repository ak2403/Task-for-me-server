const express = require('express');
const mongoose = require('mongoose');
require('../models/user.js');
require('../models/project.js');

const users = mongoose.model('users');
const projects = mongoose.model('projects');
let router = express.Router();

router.post('/add-project', (req, res) => {
});

router.post('/get-sub-project', (req, res) => {
});

module.exports = router;