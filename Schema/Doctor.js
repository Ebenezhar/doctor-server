const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    notAvailable: [{
        notAvailableDate: String,
        comment: String,
    }],
    contact: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    identity: { type: String, required: true },
})

module.exports = mongoose.model('Doctor', doctorSchema);