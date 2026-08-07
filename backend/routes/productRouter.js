const express = require("express");

const router = express.Router();

const {
    createProduct,
    bulkCreateProducts,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");


//Admin routes
router.post("/add", authMiddleware, adminMiddleware, createProduct);
router.post("/bulk", authMiddleware, bulkCreateProducts);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);


//Cutomer Routes
router.get("/", getAllProducts);
router.get("/:id",getProductById);

module.exports = router;


