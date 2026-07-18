const express = require("express");

const router  = express.Router();

const{
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middlewares/authMiddleware");


router.post("/add", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.put("/update", authMiddleware, updateCartItem);

//remove a product from cart
router.delete("/remove", authMiddleware, removeCartItem);

//Clear the cart
router.delete("/clear", authMiddleware, clearCart);


module.exports = router;