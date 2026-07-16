const express = require("express");

const router = express.Router();

const {
    createProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");


//Admin routes
router.post("/", authMiddleware, adminMiddleware, createProduct);
// router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
// router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);


//Cutomer Routes
// router.get("/", getAllProducts);
// router.get("/:id",getProductById);

module.exports = router;


// getAllProducts,
//     getProductById,
//     updateProduct,
//     deleteProduct,