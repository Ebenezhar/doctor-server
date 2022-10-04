const bcrypt = require('bcryptjs');
const Doctor = require('../Schema/Doctor');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
var ObjectId = require('mongoose').Types.ObjectId;
const AppointmentDet = require('../Schema/AppointmentDet');
const secretKey = process.env.SECRET_KEY;

const registerDoctor = async (req, res) => {
    try {
        delete req.body.verpassword;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const user = await Doctor.create(req.body);
        if (user._id) {
            res.status(200).send({ message: `${user.firstName}, Your Profile has been created successfully` })
        }
    } catch (error) {
        console.log(error)
    }
}
const registerUser = async (req, res) => {
    try {
        delete req.body.verpassword;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const user = await User.create(req.body);
        if (user._id) {
            res.status(200).send({ message: `${user.firstName}, Your Profile has been created successfully` })
        }
    } catch (error) {
        console.log(error)
    }
}


const loginasDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ email: req.body.email });
        if (doctor) {
            const match = await bcryptjs.compare(req.body.password, doctor.password);
            if (match) {
                const token = jwt.sign({ id: doctor._id, name: doctor.firstName }, secretKey);
                res.status(200).json({
                    message: "Successfully Logged in",
                    token: token,
                    name: doctor.firstName,
                    id: doctor._id,
                });
            } else {
                res.status(400).json({ message: "Password is incorrect" });
            }
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
}

const loginasUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const match = await bcryptjs.compare(req.body.password, user.password);
            if (match) {
                const token = jwt.sign({ id: user._id, name: user.firstName }, secretKey);
                res.status(200).json({
                    message: "Successfully Logged in",
                    token: token,
                    name: user.firstName,
                    id: user._id,
                });
            } else {
                res.status(400).json({ message: "Password is incorrect" });
            }
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
}

const bookPatient = async (req, res) => {
    try {
        req.body.appoinmentDate = new Date(req.body.appoinmentDate).toDateString();
        const find = await AppointmentDet.find({ doctorId: req.body.doctorId, appoinmentDate: req.body.appoinmentDate })
        req.body.token = find.length + 1;
        await AppointmentDet.create(req.body);
        res.status(200).send({ message: "Successfully Booked" })


    } catch (error) {
        console.log(error);
    }
}


const checkAvailability = async (req, res) => {
    let date = new Date(req.body.date).toDateString();
    try {
        const resultCount = await AppointmentDet.find({ doctorId: new ObjectId(req.params.id), appoinmentDate: date }).count();
        if (resultCount > 2) {
            res.status(400).send({ message: "Slot is full" })
        }
        else {
            res.status(200).send({ message: "Available to book" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerDoctor, registerUser, loginasDoctor, loginasUser, bookPatient, checkAvailability }