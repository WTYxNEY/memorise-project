const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const secret = 'test';

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exits." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Somethings went wrongs." })
    }
};

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already exits." })

        if (password !== confirmPassword) return res.status(404).json({ message: "Password don't match." })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: "Somethings went wrongs." })
    }
};

module.exports = { signin, signup }