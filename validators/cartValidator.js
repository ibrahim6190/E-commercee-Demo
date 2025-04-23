import Joi from "joi";

// Validate cart item when adding to cart
export function addToCartValidator(item) {
    if (!item || !item.id || item.quantity <= 0) {
        throw new Error("Invalid item for adding to cart.");
    }
    return true;
}
  
  // Validate cart update
  export const updateCartValidator = (data) => {
    const schema = Joi.object({
      quantity: Joi.number().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required'
      })
    });
    
    return schema.validate(data);
  };
  
  
// cartValidator.js




// Validator for updating items in the cart
export function updateCartItemValidator(item) {
    if (!item || !item.id || item.quantity < 0) {
        throw new Error("Invalid item for updating cart.");
    }
    return true;
}

// Validator for checking out the cart
export function checkoutCartValidator(cart) {
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        throw new Error("Cannot checkout an empty cart.");
    }
    return true;
}

  // 3. SESSION MIDDLEWARE FOR GUEST USERS
  // middleware/cartSession.js
  
//   import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid
  
//   export const ensureCartSession = (req, res, next) => {
//     // Check if user is authenticated
//     if (req.user) {
//       // User is authenticated, proceed
//       next();
//       return;
//     }
    
//     // For non-authenticated users, use session-based cart
//     if (!req.session.cartId) {
//       req.session.cartId = uuidv4();
//     }
    
//     next();
//   };