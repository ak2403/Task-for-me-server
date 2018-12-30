const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuid = require('uuid')
require('dotenv').config({ path: 'variables.env' })
const Users = require('./models/user')
const Companies = require('./models/company')
const Projects = require('./models/project')
const Issues = require('./models/issue')
const session = require('express-session')
const passport = require('passport');
require('./routes/auth')(passport)
const ProtectedCheck = require('./routes/protectedCheck')
const authentication = require('./routes/user')
const projects = require('./routes/project')
const companyRoute = require('./routes/company')
const issueRoute = require('./routes/issue')

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => 'DB connected successfully')
    .catch(err => console.error(err))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    genid: req => {
        return uuid()
    },
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authentication)
app.use('/company', companyRoute)
app.use('/projects', projects)
app.use('/issues', issueRoute)

app.listen('5000', () => {
    console.log('server running now...')
});