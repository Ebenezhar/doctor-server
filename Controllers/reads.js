const AppointmentDet = require("../Schema/AppointmentDet");
const Doctor = require("../Schema/Doctor");
const User = require("../Schema/User");
var ObjectId = require('mongoose').Types.ObjectId;

const readPatients = async (req, res) => {
    const date = new Date().toDateString();
    try {
        const result = await AppointmentDet.find({ doctorId: new ObjectId(req.params.id), appoinmentDate: date, visited: false });
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }

}

const readDoctors = async (req, res) => {
    try {
        const result = await Doctor.find();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}
const readDoctor = async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await Doctor.findOne({ _id: req.params.id }, { notAvailable: 1 });
        res.status(200).send(result);
        // res.send(result);
    } catch (error) {
        console.log(error);
    }
}


const readTokens = async (req, res) => {

    try {
        const result = await AppointmentDet.aggregate(
            [
                {
                    '$match': {
                        'visited': false,
                        'userId': new ObjectId(req.params.id)
                    }
                }, {
                    '$lookup': {
                        'from': 'doctors',
                        'localField': 'doctorId',
                        'foreignField': '_id',
                        'as': 'docDet'
                    }
                }, {
                    '$unwind': {
                        'path': '$docDet'
                    }
                }, {
                    '$project': {
                        'patientName': 1,
                        'appoinmentDate': 1,
                        'gender': 1,
                        'token': 1,
                        'docDet': {
                            'firstName': 1,
                            'gender': 1,
                            'identity': 1
                        }
                    }
                }
            ]);
        res.status(200).send(result);
        // console.log(result);

    } catch (error) {
        console.log(error);
    }
}


module.exports = { readPatients, readDoctors, readTokens, readDoctor }