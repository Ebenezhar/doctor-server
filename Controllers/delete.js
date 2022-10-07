const AppointmentDet = require("../Schema/AppointmentDet");
var ObjectId = require('mongoose').Types.ObjectId;

const deleteToken = async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await AppointmentDet.deleteOne({ _id: new ObjectId(req.params.id) })
        if (result.acknowledged === true) {
            res.status(200).send({ message: "Success" });
        } else {
            res.status(400).send({ message: "Error" });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteToken }