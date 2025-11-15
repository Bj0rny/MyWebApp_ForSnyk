const express = require('express');
const app = express();
const users = require('./routes/users');

// Hardcoded secret that Snyk will flag
const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";

// Hardcoded private key
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALFakeKeyFakeKey
-----END PRIVATE KEY-----`;

app.use(express.json());

// Insecure HTTP only
app.get('/', (req, res) => {
    res.send('Vulnerable Test App is running!');
});

app.use('/users', users);

//No security headers (Helmet disabled)
app.listen(3000, () => {
    console.log('App running on http://localhost:3000');
});
