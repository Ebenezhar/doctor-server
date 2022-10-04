const AppointmentDet = require("../Schema/AppointmentDet");
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


module.exports = { updateAppointmentList }