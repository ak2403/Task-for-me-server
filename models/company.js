const mongoose = require('mongoose');
const _ = require('lodash')
const schema = mongoose.Schema;

const companySchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    }
});

const companyModel = mongoose.model('companies', companySchema);
module.exports = companyModel;