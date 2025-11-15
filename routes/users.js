const express = require('express');
const router = express.Router();
const fs = require('fs');
const { exec } = require('child_process');

// Fake DB
let users = [
    { id: 1, username: "admin", role: "admin" },
    { id: 2, username: "test", role: "user" }
];

// SQL Injection
router.get('/sql/:username', (req, res) => {
    const username = req.params.username;

    // Vulnerable SQL query pattern
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    res.send("Executed query: " + query);
});

//Command Injection
router.get('/ping/:host', (req, res) => {
    const host = req.params.host;

    exec(`ping -c 1 ${host}`, (err, output) => {
        if (err) return res.send("Error");
        res.send(output);
    });
});

// Path Traversal
router.get('/file/:name', (req, res) => {
    const name = req.params.name;

    const filePath = __dirname + '/../files/' + name;

    res.sendFile(filePath);
});

// Weak crypto
router.get('/weak-hash/:input', (req, res) => {
    const crypto = require('crypto');
    const input = req.params.input;

    // MD5 hashing (insecure)
    const hash = crypto.createHash('md5').update(input).digest('hex');

    res.send("Weak MD5 hash: " + hash);
});

//Insecure login (no rate limiting)
router.post('/login', (req, res) => {
    const { username } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).send("Invalid login");

    res.send("Logged in as " + username);
});

module.exports = router;
