const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashPass = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashPass });

        await user.save();
        // const userSave = await user.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
            }
        });

        // res.send("User registered successfully");

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ message: "User not registered" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "email or password is incorrect" });
        }
        const token = jwt.sign({ email: user.email }, "hello", {
            expiresIn: "30m"
        });
        res.status(201).json({
            message: "User logged in successfully",
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                token
            },
        });
    }catch(err){
    res.status(500).json({message : "server error",error : err.message});
    }
};