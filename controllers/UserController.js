const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

const SignUp = async (req, res) => {
    try {
        const { fullName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            address,
            city,
            state,
            pin,
            country } = req.body;

        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered. Please login or use a different email." });
        }

        const existingPhoneUser = await UserModel.findOne({ phoneNumber: phoneNumber });
        if (existingPhoneUser) {
            return res.status(400).json({ message: "Phone number is already registered." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        if (pin < 100000) {
            return res.status(400).json({ message: "Invalid PIN: must be a 6-digit positive integer." });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({
            fullName,
            email,
            phoneNumber,
            password: hashPassword,
            address,
            city,
            state,
            pin,
            country
        })

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("SignUp error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

const SignIn = async (req, res) => {
    const User = await UserModel.findOne({ email: req.body.email });
    if (!User) {
        return res.status(400).send({ message: 'User not found please SignUp again!' })
    }
    try {
        const match = await bcrypt.compare(req.body.password, User.password);
        if (match) {
            const accessToken = jwt.sign(JSON.stringify(User), process.env.JWTSECRET);
            res.status(200).send({ User, accessToken, message: "user loged in successfully!" });
        } else {
            return res.status(400).send({ message: 'Invalid Password!' })
        }
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}

const GetUser = async (req, res) => {
    const id = req.query.userid;
    try {
        const User = await UserModel.findById(id);
        res.status(200).send(User);
    } catch (error) {
        console.log(error, "Error");
        res.status(500).send({ message: "Failed to fetch user", error: error.message });
    }
}


module.exports = {
    SignUp,
    SignIn,
    GetUser
}