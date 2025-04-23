import { Schema, model, Types } from "mongoose";


const cartItemSchema = new Schema({
    productId: {
        type: Types.ObjectId, // Use Types from the imported Schema
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: null
    }
});

const cartSchema = new Schema({
    userId: {
        type: Types.ObjectId, // Use Types here as well
        ref: "User",
        required: false // Not required for guest carts
    },
    items: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Guest carts expire after 7 days if not used
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual properties to calculate cart totals
cartSchema.virtual('totalItems').get(function() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
});

cartSchema.virtual('totalAmount').get(function() {
    return parseFloat(this.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
    ).toFixed(2));
});

export const CartModel = model("Cart", cartSchema); // Use model directly