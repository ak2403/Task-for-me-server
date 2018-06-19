const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const authentication = require('./routes/authentication');

mongoose.connect('mongodb://akspikey:thats11310104007@ds259820.mlab.com:59820/taskforme');
app.use(bodyParser.json());

app.use('/api', authentication);

app.listen('5000', () => {
    console.log('server running now...')
});