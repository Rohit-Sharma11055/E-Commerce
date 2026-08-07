const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {connectDB} = require("./config/db");
const cookieParser = require("cookie-parser");

//Load .env Variables
dotenv.config();

//Connect database
connectDB();

//Initialising express
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//Test Route
app.get("/", (req, res) => {
    res.send("E-Commerce Api is running...");
});

//Routes

const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);


//Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
});