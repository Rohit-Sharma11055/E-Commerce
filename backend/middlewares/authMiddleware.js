const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async(req, res, next) => {
    try{
        let token;

        //check if header exist
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            //Get Token
            token = req.headers.authorization.split(" ")[1];


            //verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Admin
            if (decoded.role === "admin") {
                req.user = {
                    role: "admin",
                    email: process.env.ADMIN_EMAIL,
                };
                
                return next();
            }

            // Customer
            req.user = await User.findById(decoded.id).select("-password");

            next();
        }else{
            return res.status(401).json({
                success: false,
                message: "Not Authorized. No token provided.",
            });
        }
    }catch(err){
        console.error(err);
        return res.status(402).json({
            success: false,
            message: "Invalid or expired token."
        })
    }
}

module.exports = authMiddleware;