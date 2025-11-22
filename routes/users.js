const express = require('express');
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const { execFile } = require('child_process');
const rateLimit = require('express-rate-limit');

// Rate limiting to prevent brute force
const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Too many login attempts"
});

// Fake DB
let users = [
    { id: 1, username: "admin", role: "admin" },
    { id: 2, username: "test", role: "user" }
];

// SQL Injection Fix (uses parameterization simulation)
router.get('/sql/:username', (req, res) => {
    const username = req.params.username;

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).send("Invalid input");
    }

    res.send("Secure user lookup for: " + username);
});

// Command Injection Fix
router.get('/ping/:host', (req, res) => {
    const host = req.params.host;

    if (!/^[a-zA-Z0-9\.\-]+$/.test(host)) {
        return res.status(400).send("Invalid host");
    }

    execFile("ping", ["-c", "1", host], (err, output) => {
        if (err) return res.send("Error");
        res.send(output);
    });
});

// Path Traversal Fix
router.get('/file/:name', (req, res) => {
    const name = req.params.name;

    if (!/^[a-zA-Z0-9\.\-]+$/.test(name)) {
        return res.status(400).send("Invalid filename");
    }

    const safePath = `${__dirname}/../files/${name}`;
    res.sendFile(safePath);
});

//Replace weak MD5 with SHA-256
router.get('/hash/:input', (req, res) => {
    const input = req.params.input;
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    res.send("Secure SHA-256 hash: " + hash);
});

//Secure login with rate limiting
router.post('/login', loginLimiter, (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).send("Missing username");

    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).send("Invalid login");

    res.send("Logged in as " + username);
});

module.exports = router;
