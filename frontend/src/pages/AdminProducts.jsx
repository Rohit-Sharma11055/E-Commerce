import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { productStyles } from "../assets/dummyStyles";
import AdminProductCard from "../components/AdminProductCard";
import axios from "axios";

const AdminProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    
    //Fetching Products details from backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            
            const res = await axios.get("http://localhost:5000/api/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts(res.data.products);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    //for serch functionality
    const filteredProducts = products.filter((product) => {

        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "" || product.category === category;

        return matchesSearch && matchesCategory;
    });


    //Deleting a product
    const deleteProduct = async () => {
        try {
            setDeleteLoading(true);

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/products/${selectedProduct._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Refresh Products
            fetchProducts();

            setShowDeleteModal(false);
            setSelectedProduct(null);

        } catch (err) {
            console.error(err);
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    //Helper functions
    const handleEdit = (product) => {
        navigate(`/admin/products/edit/${product._id}`);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    


    return (
        <div className={productStyles.page}>

            {/* Header */}
            <div className={productStyles.header}>
                <div>
                    <h1 className={productStyles.title}>
                        Products
                    </h1>

                    <p className={productStyles.subtitle}>
                        Manage all products in your store.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/products/add")}
                    className={productStyles.addButton}
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>


            {/* Search + Filter */}

            <div className={productStyles.topBar}>

                {/* Search */}

                <div className={productStyles.searchContainer}>
                    <Search className={productStyles.searchIcon} />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={productStyles.searchInput}
                    />
                </div>


                {/* Category */}

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={productStyles.select}
                >
                    <option value="">All Categories</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Sunglasses">Sunglasses</option>
                </select>

            </div>


            {/* Products section */}

            <div className={productStyles.grid}>
                {loading ? (
                    <p className="col-span-full text-center text-gray-500">
                        Loading products...
                    </p>
                ) : filteredProducts.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center h-60 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                        No products found.
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <AdminProductCard
                            key={product._id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))

                )}

            </div>


            {/* Delete Pop-up */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">

                        <h2 className="text-2xl font-semibold mb-3">
                            Delete Product
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete
                            <span className="font-semibold">
                                {" "}
                                {selectedProduct?.title}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedProduct(null);
                                }}
                                className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={deleteProduct}
                                disabled={deleteLoading}
                                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                            >
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default AdminProducts;