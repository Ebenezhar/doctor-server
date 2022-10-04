const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
const URL = process.env.DB;
mongoose.connect(URL);
const cors = require('cors');
const link = process.env.orgin;
app.use(cors({ link }))
const registerRoutes = require('./Routes/registerRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const portalRoutes = require('./Routes/portalRoutes');

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/portal', portalRoutes);

app.listen(5000 || process.env.PORT)