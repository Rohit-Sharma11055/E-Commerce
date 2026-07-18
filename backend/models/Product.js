const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            default: null,
            trim: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        _id: false,
    }
)

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Shirts", "Pants", "Sunglasses", "Shoes"],
        },
        subCategory: {
            type: String,
            default: "",
            trim: true,
        },
        newPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        oldPrice: {
            type: Number,
            default: null,
        },
        images: [
            {
                type: String,
                required: true,
                validate: {
                    validator: function (arr) {
                        return arr.length > 0;
                    },
                    message: "At least one image is required.",
                },
            },
        ],
        sizes: {
            type: [sizeSchema],
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);