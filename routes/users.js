const express = require('express');
const router = express.Router();

// Weak "database"
let users = [
    { id: 1, name: "Admin", role: "admin" }
];

// Unsafe route (no validation)
router.get('/:id', (req, res) => {
    const id = req.params.id;

    // No validation → potential injection
    const user = users.find(u => u.id == id);

    if (!user) return res.status(404).send("User not found");

    res.json(user);
});

// POST endpoint without validation
router.post('/add', (req, res) => {
    const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: req.body.name
    };

    users.push(newUser);

    res.json({ message: "User added", newUser });
});

module.exports = router;
