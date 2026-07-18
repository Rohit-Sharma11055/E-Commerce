const Product = require("../models/Product");
const Cart = require("../models/Cart");

const addToCart = async(req, res) => {
    try{
        const {productId, size} = req.body;

        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product Id is required.",
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
        console.err(err);
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
        if(!cart){
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