const express = require('express');
const app = express();
const users = require('./routes/users');

// Hardcoded secret (Snyk will flag)
const API_KEY = "12345-SECRET-KEY";

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Vulnerable Test App is running!');
});

// Vulnerable routes
app.use('/users', users);

// Insecure: HTTP only (no HTTPS)
app.listen(3000, () => {
    console.log('App running on http://localhost:3000');
});
