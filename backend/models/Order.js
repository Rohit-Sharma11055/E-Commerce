const mongoose =  require("mongoose");

const orderedProductSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: null,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        newPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const addressSchema = new Mongoose.Schema(
    {
        fullName: {
            type: String, 
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            typr: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: {
            type: [orderedProductSchema],
            required: true,
        },

        shippingAddress: {
            type: addressSchema,
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
        },

        shippingCharge: {
            type: Number,
            default: 0,
            min: 0,
        },

        total: {
            type: Number,
            required: true,
            min: 0,
        },

        couponCode: {
            type: String,
            default: "",
            trim: true,
        },

        paymentMethod: {
            type: String,
            default: "Cash on Delivery",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Packed",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);