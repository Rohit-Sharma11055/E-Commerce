const Product = require("../models/Product");

const createProduct = async(req, res) => {
    try{
        const{
            title,
            description,
            category,
            subCategory,
            newPrice,
            oldPrice,
            images,
            sizes,
        } = req.body;


        //Required Field Validation
        if(
            !title||
            !description||
            !category||
            newPrice === undefined||
            !images
        ){
            return res.status(400).json({
                success: false,
                message: "Please Fill all required fields.",
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
            newPrice,
            oldPrice,
            images,
            sizes,
        });

        return res.status(201).json({
            success: true,
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


const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            message: "Products fetched Successfully.",
            count: products.length,
            products,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const getProductById = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Fetched Successfully.",
            product,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const updateProduct = async(req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!updatedProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Product deleted Successfully.",
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
