const AppointmentDet = require("../Schema/AppointmentDet");
const Doctor = require("../Schema/Doctor");
var ObjectId = require('mongoose').Types.ObjectId;

const updateAppointmentList = async (req, res) => {
    try {
        console.log(req.body.visit);
        const result = await AppointmentDet.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { visited: req.body.visit } })
        if (result.acknowledged) {
            res.status(200).send({ message: 'List Updated successfully' })
        }
    } catch (error) {
        console.log(error);
    }
}

const updateAvailability = async (req, res) => {
    req.body.notAvailableDate = new Date(req.body.notAvailableDate).toDateString();
    const result = await Doctor.updateOne({ _id: req.params.id }, { $push: { notAvailable: req.body } });
    console.log(result);
    res.send({ message: 'updated successfully' })

}

module.exports = { updateAppointmentList, updateAvailability }