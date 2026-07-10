const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {connectDB} = require("./config/db");

//Load .env Variables
dotenv.config();

//Connect database
connectDB();

//Initialising express
const app = express();
app.use(cors());
app.use(express.json());

//Test Route
app.get("/", (req, res) => {
    res.send("E-Commerce Api is running...");
});

//Routes
const adminRouter = require("./routes/adminRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const authRouter = require("./routes/authRouter");

app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);


//Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
});