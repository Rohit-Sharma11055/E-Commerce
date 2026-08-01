import React from "react";
import {
    Package,
    ShoppingCart,
    Users,
} from "lucide-react";

import { adminDashboardStyles } from "../assets/dummyStyles";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const AdminDashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalCustomers: 12,   // Dummy value for now
        recentOrders: [],
        lowStockProducts: [],
    });

    const [loading, setLoading] = useState(true);

    //Getting data for dashboard from backend
    const fetchDashboardStats = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const [productRes, orderRes] = await Promise.all([
                axios.get(
                    "http://localhost:5000/api/products/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ),

                axios.get(
                    "http://localhost:5000/api/orders/admin/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ),
            ]);


            const products = productRes.data.products;
            const orders = orderRes.data.orders;

            // Latest 5 Orders
            const recentOrders = [...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);


            // Low Stock Products (stock <= 10)
            const lowStockProducts = [];

            products.forEach((product) => {
                product.sizes.forEach((size) => {
                    if (size.stock <= 10) {
                        lowStockProducts.push({
                            _id: product._id,
                            title: product.title,
                            image: product.images[0],
                            size: size.size,
                            stock: size.stock,
                        });
                    }
                });
            });

            lowStockProducts.sort((a, b) => a.stock - b.stock);

            setDashboardData({
                totalProducts: products.length,
                totalOrders: orders.length,
                totalCustomers: 12,
                recentOrders,
                lowStockProducts: lowStockProducts.slice(0, 5),
            });



        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchDashboardStats();
    }, []);


    return (
        <div className={adminDashboardStyles.page}>

            {/* Header */}
            <div className={adminDashboardStyles.header}>
                <h1 className={adminDashboardStyles.title}>
                    Admin Dashboard
                </h1>

                <p className={adminDashboardStyles.subtitle}>
                    Welcome back, Admin 👋
                </p>
            </div>


            {/* Statistics Cards */}
            <div className={adminDashboardStyles.cardGrid}>

                <div className={adminDashboardStyles.card}>
                    <div className={adminDashboardStyles.cardTop}>
                        <Package className="w-7 h-7 text-lime-600" />
                    </div>

                    <p className={adminDashboardStyles.cardTitle}>
                        Products
                    </p>

                    <h2 className={adminDashboardStyles.cardValue}>
                        {loading ? "--" : dashboardData.totalProducts}
                    </h2>
                </div>


                <div className={adminDashboardStyles.card}>
                    <div className={adminDashboardStyles.cardTop}>
                        <ShoppingCart className="w-7 h-7 text-blue-600" />
                    </div>

                    <p className={adminDashboardStyles.cardTitle}>
                        Orders
                    </p>

                    <h2 className={adminDashboardStyles.cardValue}>
                        {loading ? "--" : dashboardData.totalOrders}
                    </h2>
                </div>


                <div className={adminDashboardStyles.card}>
                    <div className={adminDashboardStyles.cardTop}>
                        <Users className="w-7 h-7 text-purple-600" />
                    </div>

                    <p className={adminDashboardStyles.cardTitle}>
                        Customers
                    </p>

                    <h2 className={adminDashboardStyles.cardValue}>
                        {loading ? "--" : dashboardData.totalCustomers}
                    </h2>
                </div>

            </div>



            {/* Bottom Section */}

            <div className={adminDashboardStyles.bottomGrid}>

                {/* Recent Orders */}

                <div className={adminDashboardStyles.sectionCard}>

                    <h2 className={adminDashboardStyles.sectionTitle}>
                        Recent Orders
                    </h2>

                    {dashboardData.recentOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">

                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3">Order ID</th>
                                        <th className="text-left py-3">Customer</th>
                                        <th className="text-left py-3">Total</th>
                                        <th className="text-left py-3">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dashboardData.recentOrders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="py-3">
                                                #{order._id.slice(-6)}
                                            </td>

                                            <td>
                                                {order.shippingAddress.fullName}
                                            </td>

                                            <td>
                                                ₹{order.total}
                                            </td>

                                            <td>
                                                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    ) : (
                        <div className={adminDashboardStyles.placeholder}>
                            No orders have been placed yet.
                        </div>
                    )}

                </div>


                {/* Low Stock */}

                <div className={adminDashboardStyles.sectionCard}>

                    <h2 className={adminDashboardStyles.sectionTitle}>
                        Low Stock Products
                    </h2>

                    {dashboardData.lowStockProducts.length > 0 ? (
                        <div className="space-y-4">

                            {dashboardData.lowStockProducts.map((product) => (
                                <div
                                    key={`${product._id}-${product.size}`}
                                    className="flex items-center justify-between border rounded-xl p-3 hover:bg-gray-50 transition"
                                >

                                    <div className="flex items-center gap-4">

                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-14 h-14 rounded-lg object-cover border"
                                        />

                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {product.title}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Size: {product.size || "Standard"}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                                        {product.stock} Left
                                    </span>

                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className={adminDashboardStyles.placeholder}>
                            🎉 No low stock products.
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;