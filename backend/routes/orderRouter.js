const express = require("express");
const router = express.Router();

const{
    checkout,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");


//Customer
router.post("/checkout", authMiddleware, checkout);
router.get("/", authMiddleware, getMyOrders);
router.get("/:orderId", authMiddleware, getOrderById);

//Admin
router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrders);
router.put("/admin/:orderId/status", authMiddleware, adminMiddleware, updateOrderStatus);


module.exports = router;