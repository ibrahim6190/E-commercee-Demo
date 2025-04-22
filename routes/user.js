import { Router } from "express";
import {
  registerUser,
  registerAdmin,
  registerSuperAdmin,
  loginUser,
  updateUser,
  getAuthenticatedUser,
} from "../controllers/user.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const userRouter = Router();

// Registration routes for different roles
userRouter.post("/users/register", registerUser); // Default buyer registration
userRouter.post("/users/register/admin", registerAdmin); // Admin registration
userRouter.post("/users/register/superadmin", registerSuperAdmin); // Superadmin registration

// Login route (shared for all roles)
userRouter.post("/users/login", loginUser);

// Protected routes
userRouter.get("/users/profile", isAuthenticated, getAuthenticatedUser);
userRouter.patch("/users/:id", isAuthenticated, updateUser);

export default userRouter;
