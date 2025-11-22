require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const app = express();
const users = require('./routes/users');

app.use(express.json());

//Disable X-Powered-By
app.disable('x-powered-by');

//Add secure headers
app.use(helmet());

//Load secrets from environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const AWS_KEY = process.env.AWS_KEY;

app.get('/', (req, res) => {
    res.send('Secure Test App is running!');
});

app.use('/users', users);

app.listen(3000, () => {
    console.log('App running securely on http://localhost:3000');
});
