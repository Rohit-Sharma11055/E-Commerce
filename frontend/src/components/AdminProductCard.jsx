import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const AdminProductCard = ({product, onEdit, onDelete,}) => {

    // Total stock of all sizes
    const totalStock = product.sizes.reduce(
        (total, size) => total + size.stock,
        0
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">

            {/* Product Image */}
            <div className="h-56 bg-gray-100 overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
            </div>

            {/* Product Details */}
            <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-xl font-bold text-gray-900">₹{product.newPrice}</p>

                        {product.oldPrice && (
                            <p className="text-sm text-gray-400 line-through">₹{product.oldPrice}</p>
                        )}
                    </div>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            totalStock <= 5
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        Stock : {totalStock}
                    </span>

                </div>


                {/* Control Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition"
                    >
                        <Pencil size={18} />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition"
                    >
                        <Trash2 size={18} />
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AdminProductCard;