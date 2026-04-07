const { registerUser, loginUser } = require("../services/authService");

// Register user
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email & Password is required" });
        }
        await registerUser(email, password);

        return res.status(201).json({ message: "User registered" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email & Password is required" });
        }
        const token = await loginUser(email, password);

        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { register, login };