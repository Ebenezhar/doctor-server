const express = require('express');
const { bookPatient, checkAvailability } = require('../Controllers/posts');
const router = express.Router();
const { readPatients, readDoctors, readTokens } = require('../Controllers/reads');
const { updateAppointmentList } = require('../Controllers/updates');


router.get('/read-patients/:id', readPatients);
router.get('/read-doctors', readDoctors);
router.post('/checkAvailability/:id', checkAvailability);
router.post('/book-doctor', bookPatient);
router.put('/handle-visit/:id', updateAppointmentList);
router.get('/read-tokens/:id', readTokens);
module.exports = router;