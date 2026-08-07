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

        //validating newPrice is lower than oldPrice
        if (newPrice > oldPrice) {
            return res.status(400).json({
                success: false,
                message: "New price cannot be greater than old price."
            });
        }

        if (newPrice <= 0 || oldPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Prices must be greater than 0."
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


const bulkCreateProducts = async(req, res) => {
    try{
        const {products} = req.body;

        //validate request
        if(!products || !Array.isArray(products)){
            return res.status(400).json({
                success: false,
                message: "Products must be an array.",
            });
        }

        if(products.length === 0){
            return res.status(400).json({
                success: false,
                message: "Products array cannot be empty.",
            });
        }

        const errors = [];

        //Validate every product
        for(let i = 0; i < products.length; i++){
            const product = products[i];

            const{
                title,
                description,
                category,
                subCategory,
                newPrice,
                oldPrice,
                images,
                sizes,
            } = product;

            //Required Fields
            if(
                !title ||
                !description ||
                !category ||
                newPrice === undefined ||
                !images
            ){
                errors.push({
                    product: i + 1,
                    message: "Please fill all required fields.",
                });
            }

            //Images
            if(!Array.isArray(images) || images.length === 0){
                errors.push({
                    product: i + 1,
                    message: "At least one image is required.",
                });
            }

            //Sizes
            if(sizes && !Array.isArray(sizes)){
                errors.push({
                    product: i + 1,
                    message: "Sizes must be an array.",
                });
            }

            //Prices
            if(oldPrice != null && newPrice > oldPrice){
                errors.push({
                    product: i + 1,
                    message: "New Price cannot be greater than old Price.",
                });
            }
        }

        //If any validation failed
        if(errors.length > 0){
            return res.status(400).json({
                success: false,
                message: "Bulk Import Failed.",
                errors,
            });
        }


        //Insert all products
        const createdProducts = await Product.insertMany(products);

        return res.status(201).json({
            success: false,
            message: `${createdProducts.length} products imported successfully.`,
            products: createdProducts,
        });


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


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
        const { newPrice, oldPrice } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // validating that newPrice is lower than oldPrice
        const updatedNewPrice = newPrice ?? product.newPrice;
        const updatedOldPrice = oldPrice ?? product.oldPrice;

        if (updatedNewPrice > updatedOldPrice) {
            return res.status(400).json({
                success: false,
                message: "New price cannot be greater than old price."
            });
        }

        if (updatedNewPrice <= 0 || updatedOldPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Prices must be greater than 0."
            });
        }


        //updating product
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
    bulkCreateProducts,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
