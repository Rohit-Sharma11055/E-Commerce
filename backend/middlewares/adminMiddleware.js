const adminMiddelware = (req, res, next) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "Access Denied. Admin Only.",
            });
        }

        next();
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

module.exports = adminMiddelware;