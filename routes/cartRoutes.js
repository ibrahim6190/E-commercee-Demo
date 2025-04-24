// import express from "express";
// import { 
//     getCart, 
//     addToCart, 
//     updateCartItem, 
//     removeCartItem, 
//     clearCart, 
//     checkout,
//     transferGuestCart
// } from "../controllers/cartController.js";
// import { isAuthenticated } from "../middlewares/auth.js";
// import cookieParser from "cookie-parser";

// const router = express.Router();

// // Add cookie parser middleware for all cart routes
// router.use(cookieParser());

// // Routes that work for both guests and authenticated users
// router.get("/", getCart);
// router.post("/add", addToCart);
// router.put("/item/:itemId", updateCartItem);
// router.delete("/item/:itemId", removeCartItem);
// router.delete("/", clearCart);

// // Routes that require authentication
// router.post("/checkout", isAuthenticated, checkout);
// router.post("/transfer", isAuthenticated, transferGuestCart);

// export default router;

import { Router } from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    checkout
} from "../controllers/cartController.js";
import isAuthenticated from "../middlewares/auth.js";

// Create cart router
const cartRouter = Router();

// All cart routes require authentication
cartRouter.use(isAuthenticated);

// Define routes
cartRouter.get('/cart', getCart);
cartRouter.post('/cart/items', addToCart);
cartRouter.patch('/cart/items/:itemId', updateCartItem);
cartRouter.delete('/cart/items/:itemId', removeCartItem);
cartRouter.delete('/cart', clearCart);
cartRouter.post('/cart/checkout', checkout);

// Export the router
export default cartRouter; 