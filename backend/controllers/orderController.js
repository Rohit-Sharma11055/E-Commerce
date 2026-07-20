const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");


const checkout = async(req, res) => {
    const session = await mongoose.startSession();

    try{
        session.startTransaction();

        const {shippingAddress} = req.body;
        if(!shippingAddress){
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                success: false,
                message: "Shipping address is required.",
            });
        }


        const cart = await Cart.findOne({
            user: req.user._id,
        })
            .populate("items.product")
            .session(session);

        if(!cart || cart.items.length === 0){
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                success: false,
                message: "Your Cart is empty.",
            });
        }


        let subtotal = 0;
        const orderedProducts = [];

        //Validate Every Product first
        for(const item of cart.items){
            const product = item.product;

            if(!product){
                await session.abortTransaction();
                session.endSession();

                return res.status(404).json({
                    success: false,
                    message: "One of the Products no longer exists.",
                });
            }

            const selectedSize = product.sizes.find(
                size => size.size === (item.size || null)
            );

            if(!selectedSize){
                await session.abortTransaction();
                session.endSession();

                return res.status(400).json({
                    success: false,
                    message: `${product.title} size is no longer available`,
                });
            }

            if(selectedSize.stock < item.quantity){
                await session.abortTransaction();
                session.endSession();

                return res.status(400).json({
                    success: false,
                    message: `${product.title} (${item.size}) has only ${selectedSize.stock} item left.`,
                });
            }

            subtotal += product.newPrice * item.quantity;

            orderedProducts.push({
                product: product._id,
                title: product.title,
                image: product.images[0],
                size: item.size,
                quantity: item.quantity,
                newPrice: product.newPrice,
            });
        }


        const discount = 0;
        const shippingCharge = 50;
        const total = subtotal + shippingCharge - discount;

        const order = await Order.create(
            [
                {
                    user: req.user._id,
                    products: orderedProducts,
                    shippingAddress,
                    subtotal,
                    discount,
                    shppingCharge,
                    total,
                    paymentMethod: "Cash on Delivery",
                },
            ],
            {session}
        );


        //Reduce stock
        for(const item of cart.items){
            const product = await Product.findById(item.product._id).session(session);

            const selectedSize  = product.sizes.find(
                size => size.size === (item.size || null)
            );

            selectedSize.stock -= item.quantity;

            await product.save({session});
        }


        //Clear Cart
        cart.items = [];
        await cart.save({session});

        await session.commitTransaction();
        session.endSession();

        return res.status(201).jaon({
            success: true,
            message: "Order placed successfully.",
            order: order[0],
        });

    }catch(err){
        await session.abortTransaction();
        session.endSession();

        console.error(err);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};


const getMyOrders = async(req, res) => {
    try{
        const orders = await Order.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            sount: orders.length,
            orders,
        });


    }catch(err){
        console.error(err);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const getOrderById = async(req, res) => {
    try{


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const getAllOrders = async(req, res) => {
    try{


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


const updateOrderStatus = async(req, res) => {
    try{


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}


module.exports = {
    checkout, 
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};