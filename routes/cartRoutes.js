import express from "express";
import { 
    getCart, 
    addToCart, 
    updateCartItem, 
    removeCartItem, 
    clearCart, 
    checkout,
    transferGuestCart
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import cookieParser from "cookie-parser";

const router = express.Router();

// Add cookie parser middleware for all cart routes
router.use(cookieParser());

// Routes that work for both guests and authenticated users
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/item/:itemId", updateCartItem);
router.delete("/item/:itemId", removeCartItem);
router.delete("/", clearCart);

// Routes that require authentication
router.post("/checkout", isAuthenticated, checkout);
router.post("/transfer", isAuthenticated, transferGuestCart);

export default router;