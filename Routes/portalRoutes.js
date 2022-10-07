const express = require('express');
const { bookPatient, checkAvailability } = require('../Controllers/posts');
const { deleteToken } = require('../Controllers/delete');
const router = express.Router();
const { readPatients, readDoctors, readTokens, readDoctor } = require('../Controllers/reads');
const { updateAppointmentList, updateAvailability } = require('../Controllers/updates');


router.get('/read-patients/:id', readPatients);
router.get('/read-doctor/:id', readDoctor);
router.get('/read-doctors', readDoctors);
router.post('/checkAvailability/:id', checkAvailability);
router.post('/book-doctor', bookPatient);
router.put('/handle-visit/:id', updateAppointmentList);
router.get('/read-tokens/:id', readTokens);
router.put('/not-availability/:id', updateAvailability)
router.delete('/delete-token/:id', deleteToken)
module.exports = router;