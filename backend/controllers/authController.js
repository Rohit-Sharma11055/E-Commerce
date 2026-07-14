const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        //Validating values
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all fields.",
            });
        }


        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        //validating length of password
        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password should be atleast 6 characters long.",
            });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //Generate token
        const token = generateToken({
            id: user._id,
            role: "customer",
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: "customer",
            },
        });


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
};

const loginUser = async(req, res) => {
    try{
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = generateToken({
                role: "admin",
            });

            return res.status(200).json({
                success: true,
                message: "Admin Login Successfully.",
                token,
                user: {
                    name: "Admin",
                    email: process.env.ADMIN_EMAIL,
                    role: "admin",
                },
            });
        }

        const {email, password} = req.body;

        //Validating values
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all values.",
            });
        }

        //Finding User
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //Checking password
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: "Invalid or Incorrect Password.",
            });
        }

        //Generate Token
        const token = generateToken({
            id: user._id,
            role: "customer",
        });
        return res.status(200).json({
            success: true,
            message: "User Login Successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: "customer",
            },
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
};

module.exports = {
    registerUser,
    loginUser,
};