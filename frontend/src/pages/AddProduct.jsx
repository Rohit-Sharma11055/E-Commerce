import React, { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productStyles } from "../assets/dummyStyles";
import axios from "axios";

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        subCategory: "",
        newPrice: "",
        oldPrice: "",
        images: [],
        sizes: [
            {
                size: "",
                stock: "",
            },
        ],
    });

    //validating form values
    const validateForm = () => {
        if (!formData.title.trim()) {
            alert("Title is required.");
            return false;
        }

        if (!formData.description.trim()) {
            alert("Description is required.");
            return false;
        }

        if (!formData.category) {
            alert("Please select a category.");
            return false;
        }

        if (Number(formData.newPrice) <= 0) {
            alert("New Price must be greater than 0.");
            return false;
        }

        if (
            formData.oldPrice &&
            Number(formData.oldPrice) <= Number(formData.newPrice)
        ) {
            alert("Old Price should be greater than New Price.");
            return false;
        }

        if (formData.images.length === 0) {
            alert("Upload at least one image.");
            return false;
        }

        if (formData.sizes.length === 0) {
            alert("Add at least one size.");
            return false;
        }

        return true;
    };

    //Creating product
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/products/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Product created successfully!");

            navigate("/admin/products");

        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    //Handler Functions
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB.");
            return;
        }
        
        uploadImage(file);
    };


    const addSize = () => {
        setFormData((prev) => ({
            ...prev,
            sizes: [
                ...prev.sizes,
                {
                    size: "",
                    stock: "",
                },
            ],
        }));
    };

    const removeSize = (index) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }));
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...formData.sizes];

        updatedSizes[index][field] = value;

        setFormData((prev) => ({
            ...prev,
            sizes: updatedSizes,
        }));
    };


    //Upload Image
    const uploadImage = async (file) => {
        try {
            setUploading(true);

            const data = new FormData();

            data.append("file", file);
            data.append("upload_preset", UPLOAD_PRESET);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                data
            );

            const imageUrl = response.data.secure_url;

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, imageUrl],
            }));

        } catch (err) {
            console.error("Image Upload Error:", err);
        } finally {
            setUploading(false);
        }
    };

    //Remove Image
    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className={productStyles.page}>

            {/* Header */}
            <div className={productStyles.header}>
                <div>
                    <h1 className={productStyles.title}>Add Product</h1>
                    <p className={productStyles.subtitle}>Create a new product for your store.</p>
                </div>
            </div>


            {/* Form Container */}
            <form className="space-y-8" onSubmit={handleSubmit} >
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-5">Basic Information</h2>
                    <div className="space-y-5">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Product Title"
                            className={productStyles.input}
                        />
                        <textarea
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Product Description"
                            className={productStyles.textarea}
                        />

                        <div className="grid md:grid-cols-2 gap-5">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={productStyles.select}
                            >
                                <option value="">Select Category</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Pants">Pants</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Sunglasses">Sunglasses</option>
                            </select>

                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                placeholder="Sub Category"
                                className={productStyles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-5">Pricing</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            type="number"
                            name="newPrice"
                            value={formData.newPrice}
                            onChange={handleChange}
                            placeholder="New Price"
                            className={productStyles.input}
                        />
                        <input
                            type="number"
                            name="oldPrice"
                            value={formData.oldPrice}
                            onChange={handleChange}
                            placeholder="Old Price"
                            className={productStyles.input}
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">

                    <h2 className="text-xl font-semibold mb-6">
                        Product Images
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                        {formData.images.map((image, index) => (

                            <div
                                key={index}
                                className="relative rounded-xl overflow-hidden border"
                            >

                                <img
                                    src={image}
                                    alt="product"
                                    className="w-full h-48 object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8"
                                >
                                    ✕
                                </button>

                            </div>

                        ))}

                        <label className="border-2 border-dashed rounded-xl h-48 flex flex-col justify-center items-center cursor-pointer hover:border-lime-500 transition">

                            <Upload size={35} />

                            <p className="mt-3 text-gray-500">

                                {uploading
                                    ? "Uploading..."
                                    : "Upload Image"}

                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />

                        </label>

                    </div>

                </div>

                {/* Sizes */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-5">Sizes & Stock</h2>

                    <div className="space-y-4">
                        {formData.sizes.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-5 gap-4 items-center"
                            >
                                <input
                                    type="text"
                                    placeholder="Size"
                                    value={item.size}
                                    onChange={(e) =>
                                        handleSizeChange(
                                            index,
                                            "size",
                                            e.target.value
                                        )
                                    }
                                    className="col-span-2 border rounded-xl px-4 py-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={item.stock}
                                    onChange={(e) =>
                                        handleSizeChange(
                                            index,
                                            "stock",
                                            e.target.value
                                        )
                                    }
                                    className="col-span-2 border rounded-xl px-4 py-3"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeSize(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addSize}
                        className="mt-5 flex items-center gap-2 text-lime-600 font-medium"
                    >
                        <Plus size={18} />
                        Add Size
                    </button>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className={productStyles.addButton}
                    >
                        {loading
                            ? "Creating Product..."
                            : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct
