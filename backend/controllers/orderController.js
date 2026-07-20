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
                    shippingCharge,
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

        return res.status(201).json({
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
            count: orders.length,
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
        const {orderId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID.",
            });
        }

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully.",
            order,
        });


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
        const orders = await Order.find()
        .populate("user", "name email")
        .sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        })


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
        const {orderId} = req.params;
        const {orderStatus} = req.body;
        
        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({
                success: false,
                message: "Invalid Order Id.",
            });
        }

        if(!orderStatus){
            return res.status(400).json({
                success: false,
                message: "Order status is required.",
            });
        }


        const validStatuses = [
            "Pending",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if(!validStatuses.includes(orderStatus)){
            return res.status(400).json({
                success: false,
                message: "Invalid order status.",
            });
        }


        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }


        //Prevent updates after final states
        if(order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"){
            return res.status(400).json({
                success: false,
                message: `cannot update a ${order.orderStatus} order.`,
            });
        }


        //Allowed status changes
        const allowedTransitions = {
            Pending: ["Packed", "Cancelled"],
            Packed: ["Shipped", "Cancelled"],
            Shipped: ["Delivered"],
        };

        if(!allowedTransitions[order.orderStatus].includes(orderStatus)){
            return res.status(400).json({
                success: false,
                message: `cannot change order status from ${order.orderStatus} to ${orderStatus}`,
            });
        }

        
        order.orderStatus = orderStatus;

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully.",
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
    checkout, 
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};