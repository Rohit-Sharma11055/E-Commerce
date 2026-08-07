import React, { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productStyles } from "../assets/dummyStyles";
import axios from "axios";

const AddProduct = () => {
    const API_URL = "http://localhost:5000";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importLoading, setImportLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [productsJson, setProductsJson] = useState(null);
    const [folderSummary, setFolderSummary] = useState({
        products: 0,
        images: 0,
    });
    const [importError, setImportError] = useState("");

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
                `&{API_URL}/api/products/add`,
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

    const handleBulkImport = async () => {
        if (!productsJson) {
            alert("Please select a valid folder.");
            return;
        }

        try {
            setImportLoading(true);
            setImportError("");

            // Get JWT
            const token = localStorage.getItem("token");

            // Create image lookup table
            const imageMap = {};

            selectedFiles.forEach((file) => {
                if (file.type.startsWith("image/")) {
                    imageMap[file.name] = file;
                }
            });

            // Clone JSON products
            const products = structuredClone(productsJson);

            // Upload every image to Cloudinary
            for (let i = 0; i < products.length; i++) {

                const product = products[i];

                if (!Array.isArray(product.images)) {
                    throw new Error(
                        `Product ${i + 1}: Images must be an array.`
                    );
                }

                const uploadedImages = await Promise.all(

                    product.images.map(async (imageName) => {

                        const imageFile = imageMap[imageName];

                        if (!imageFile) {
                            throw new Error(
                                `Product ${i + 1}: Missing image "${imageName}".`
                            );
                        }

                        return await uploadImageToCloudinary(imageFile);

                    })

                );

                product.images = uploadedImages;
            }

            // Send to backend
            const response = await axios.post(
                `${API_URL}/api/products/bulk`,
                {
                    products,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert(response.data.message);

            // Refresh product list if available
            if (typeof fetchProducts === "function") {
                fetchProducts();
            }

            // Reset modal
            setShowImportModal(false);
            setSelectedFiles([]);
            setProductsJson(null);
            setFolderSummary({
                products: 0,
                images: 0,
            });
            setImportError([]);

        } catch (err) {

            console.error(err);

            if (err.response?.data?.errors) {

                setImportErrors(err.response.data.errors);

            } else {

                alert(
                    err.response?.data?.message ||
                    err.message ||
                    "Bulk Import Failed."
                );

            }

        } finally {

            setImportLoading(false);

        }
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


    const handleFolderSelect = async (e) => {
        const files = Array.from(e.target.files);

        setImportError("");
        setSelectedFiles(files);
        setProductsJson(null);
        setFolderSummary({
            products: 0,
            images: 0,
        });

        if (files.length === 0) return;

        // Find products.json
        const jsonFile = files.find(
            (file) => file.name === "products.json"
        );

        if (!jsonFile) {
            setImportError("products.json not found.");
            return;
        }

        try {
            const text = await jsonFile.text();
            const products = JSON.parse(text);

            if (!Array.isArray(products)) {
                setImportError("products.json must contain an array.");
                return;
            }

            const imageFiles = files.filter(file =>
                file.type.startsWith("image/")
            );

            setProductsJson(products);

            setFolderSummary({
                products: products.length,
                images: imageFiles.length,
            });

        } catch (err) {
            console.error(err);
            setImportError("Invalid JSON file.");
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const data = new FormData();

        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            data
        );

        return response.data.secure_url;
    };

    return (
        <div className={productStyles.page}>

            {/* Header */}
            <div className={productStyles.header}>
                <div className="flex justify-between items-start w-full">

                    <div>
                        <h1 className={productStyles.title}>
                            Add Product
                        </h1>

                        <p className={productStyles.subtitle}>
                            Create a new product for your store.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowImportModal(true)}
                        className={productStyles.importButton}
                    >
                        <Upload size={18} />
                        <span>Bulk Import</span>
                    </button>

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


            {/*Bulk Import Dailog box*/}
            {showImportModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setShowImportModal(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-black text-2xl"
                        >
                            ×
                        </button>

                        <h2 className="text-3xl font-bold">
                            Bulk Import Products
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Select a folder containing your
                            <span className="font-semibold"> products.json </span>
                            file and all product images.
                        </p>

                        <label className="mt-8 border-2 border-dashed border-gray-300 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">

                            <Upload size={60} className="text-gray-400" />

                            <p className="text-xl font-semibold mt-5">
                                Click to Select Folder
                            </p>

                            <p className="text-gray-500 mt-2">
                                Folder should contain products.json and images.
                            </p>

                            <input
                                type="file"
                                hidden
                                webkitdirectory=""
                                directory=""
                                multiple
                                onChange={handleFolderSelect}
                            />

                        </label>


                        {importError && (
                            <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
                                {importError}
                            </div>
                        )}

                        {productsJson && (
                            <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-5">

                                <h3 className="font-semibold text-lg">
                                    Folder Loaded Successfully
                                </h3>

                                <div className="mt-3 space-y-2">

                                    <p>
                                        ✅ products.json Found
                                    </p>

                                    <p>
                                        📦 Products Found:
                                        <strong> {folderSummary.products}</strong>
                                    </p>

                                    <p>
                                        🖼 Images Found:
                                        <strong> {folderSummary.images}</strong>
                                    </p>

                                </div>

                            </div>
                        )}

                        <div className="flex justify-end gap-4 mt-8">

                            <button
                                onClick={() => setShowImportModal(false)}
                                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={!productsJson}
                                onClick={handleBulkImport}
                                className={`px-6 py-3 rounded-xl text-white ${
                                    productsJson
                                        ? "bg-lime-500 hover:bg-lime-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}

export default AddProduct
