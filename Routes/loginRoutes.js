const express = require('express');
const { loginasDoctor, loginasUser } = require('../Controllers/posts');
const router = express.Router();

router.post('/doctor', loginasDoctor);
router.post('/user', loginasUser);

module.exports = router;