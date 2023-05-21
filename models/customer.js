const mongoose = require ('mongoose');

customerSchema = new mongoose.Schema({
    name: String,
    industry: String
});

module.exports = mongoose.model('customer', customerSchema)