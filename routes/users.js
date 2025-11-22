const express = require('express');
const router = express.Router();

// Example users (replace with DB later)
const users = [
  { username: "admin", password: "1234" },
  { username: "john", password: "abcd" }
];

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input (prevents undefined / type-based issues)
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input format" });
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Safe response — NO HTML rendering → NO XSS possible
  return res.json({
    message: `Logged in as ${user.username}`
  });
});

module.exports = router;
