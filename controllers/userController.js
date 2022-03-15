require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '2h',
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users,
        });
    } catch (err) {
        console.log(err);
    }
};


const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        // const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.JWT_SECRET,
        //     {
        //         expiresIn: "2h",
        //     }
        // );
        const token = generateToken(user);

        user.token = token;
        res.status(201).json({
            user,
            token,
        });


    } catch (err) {
        console.log(err);
    }

};


const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = generateToken(user);
            user.token = token;
            res.status(200).json({
                user,
                token,
            });
            return;
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
};



module.exports = {
    register,
    login,
    getAllUsers,
};
