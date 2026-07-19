const Product = require("../models/Product");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");

const addToCart = async(req, res) => {
    try{
        const {productId, size} = req.body;

        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product Id is required.",
            });
        }

        //Checking if productId has valid format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID.",
            });
        }

        //Validating that Product exists
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found.",
            });
        }

        let cart = await Cart.findOne({user: req.user._id});

        //Creating cart for new users
        if(!cart){
            cart = new Cart({
                user: req.user._id,
                items: [],
            });
        }

        //checking if product already added to cart
        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.size === (size || null)
        );

        if(existingItem){
            return res.status(200).json({
                success: true,
                message: "product already exxists in cart.",
            });
        }


        //checking if item is out of stock
        const selectedSize = product.sizes.find(
            item => item.size === (size || null)
        );

        if (!selectedSize) {
            return res.status(404).json({
                success: false,
                message: "Selected size is not available."
            });
        }

        if (selectedSize.stock < 1) {
            return res.status(400).json({
                success: false,
                message: "This product is out of stock."
            });
        }
        

        //adding item to cart
        cart.items.push({
            product: productId,
            quantity: 1,
            size: size || null,
        });
        
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Item Added to cart Successfully",
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};


const getCart = async(req, res) => {
    try{
        const cart  = await Cart.findOne({ 
            user: req.user._id
        }).populate("items.product");


        //Cart is empty
        if(!cart || cart.items.length === 0){
            return res.status(200).json({
                success: true,
                message: "Cart is Empty.",
                cart: {
                    items: [],
                },
            });
        }


        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully.",
            cart,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const updateCartItem = async(req, res) => {
    try{
        const {productId, size, quantity} = req.body;

        if(!productId || quantity === undefined){
            return res.status(400).json({
                success: false,
                message: "Product Id and quantity are required.",
            });
        }

        //Checking if productId has valid format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID.",
            });
        }


        //Checking if user's Cart exists
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart Not Found.",
            });
        }


        //Checks if item is in cart
        const item = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.size === (size || null)
        );

        if(!item){
            return res.status(404).json({
                success: false,
                message: "Item Not Found in cart.",
            });
        }


        //filtering invalid quantity
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer.",
            });
        }
        

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        //checking if item is out of stock
        const selectedSize = product.sizes.find(
            item => item.size === (size || null)
        );

        if (!selectedSize) {
            return res.status(404).json({
                success: false,
                message: "Selected size is not available."
            });
        }

        if (quantity > selectedSize.stock) {
            return res.status(400).json({
                success: false,
                message: `Only ${selectedSize.stock} items are available.`
            });
        }


        //updating quantity and saving cart
        item.quantity = quantity;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully.",
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const removeCartItem = async(req, res) => {
    try{
        const {productId, size} = req.body;

        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product Id is required.",
            });
        }

        //Checking if productId has valid format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID.",
            });
        }


        //checks if cart exist
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }
        

        //removing product from cart
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(
            (item) =>
                !(
                    item.product.toString() === productId &&
                    item.size === (size || null)
                )
        );

        if(cart.items.length === initialLength){
            return res.status(404).json({
                success: false,
                message: "Item Not found in cart.",
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully.",
        });


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}
 

const clearCart = async(req, res) => {
    try{
        const cart = await Cart.findOne({user: req.user._id});

        if(!cart){
            return res.status(404).json({
                success: false, 
                message: "Cart not found.",
            });
        }


        cart.items = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart Cleared successfully.",
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
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};