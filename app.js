require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authRoute = require('./routes/auth.route');
const suggestionRoute = require('./routes/suggestion.route')

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}

//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use('/api', authRoute);
app.use('/api', suggestionRoute);

//Connection to mongoose

try {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => console.log('Connected to DB'));
} catch (error) {
    console.log(`connection failed!! ${error}`)
}


const port = process.env.PORT || 3000;
app.listen(port, (() => console.log(`server started on port ${port}`)));