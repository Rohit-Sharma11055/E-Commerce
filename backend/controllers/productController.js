const Product = require("../models/Product");

const createProduct = async(req, res) => {
    try{
        const{
            title,
            description,
            category,
            subCategory,
            price,
            oldPrice,
            images,
            sizes,
        } = req.body;


        //Required Field Validation
        if(
            !title||
            !description||
            !category||
            price === undefined||
            !images
        ){
            return res.status(400).json({
                success: false,
                messge: "Please Fill all required fields.",
            });
        }

        //Ensure atleast one image is provided
        if(!Array.isArray(images)||images.length === 0){
            return res.status(400).json({
                success: false,
                message: "At least one product image is required.",
            });
        }

        //Validate sizes if provided
        if(sizes && !Array.isArray(sizes)){
            return res.status(400).json({
                success: false,
                message: "Sizes must be an array",
            });
        }

        const product = await Product.create({
            title,
            description,
            category,
            subCategory,
            price,
            oldPrice,
            images,
            sizes,
        });

        return res.status(201).json({
            success: false,
            message: "Product created successfully.",
            product,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server error.",
        });
    }
};




module.exports = {
    createProduct,
};
