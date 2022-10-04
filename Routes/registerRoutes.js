const express = require('express');
const { registerDoctor, registerUser } = require('../Controllers/posts');
const router = express.Router();

router.post('/doctor', registerDoctor);
router.post('/user', registerUser);
module.exports = router;