import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendEmailSignup, transporter} from "../utils/mail.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";

// Standard user registration (buyer)
export const registerUser = async (req, res, next ) => {
    try {
        // validate user info
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        // Safely access email and username values
        const normalizedEmail = value.email ? value.email.toLowerCase() : value.email;
        const normalizedUserName = value.userName ? value.userName.toLowerCase() : value.userName;

        // check if user doesn't already exist
        const existingUser = await UserModel.findOne({
            $or: [
                { userName: normalizedUserName },
                { email: normalizedEmail }
            ]
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        // hash plaintext password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        
        // create user record in database with buyer role
        const newUser = await UserModel.create({
            ...value,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'buyer' // Explicitly set role to buyer
        });

        // Generate token
        const accessTokenSignup = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        // send registration email to user
        try {
            // Define a basic template if registerUserMailTemplate is undefined
            const emailTemplate = `<p>Welcome, ${value.userName}! Your account has been created successfully as a buyer.</p>`;
            
            await transporter.sendMail({
                from: 'ibrah.webdev@gmail.com',
                to: value.email,
                subject: 'Registration Successful',
                html: emailTemplate,
            });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Continue registration process even if email fails
        }

        // return response
        return res.status(201).json({
            message: "User created successfully!",
            accessTokenSignup,
        });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error: "Registration failed. Please try again." });
    }
}

// Admin registration
export const registerAdmin = async (req, res, next) => {
    try {
        // validate user info
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        // Safely access email and username values
        const normalizedEmail = value.email ? value.email.toLowerCase() : value.email;
        const normalizedUserName = value.userName ? value.userName.toLowerCase() : value.userName;

        // check if user doesn't already exist
        const existingUser = await UserModel.findOne({
            $or: [
                { userName: normalizedUserName },
                { email: normalizedEmail }
            ]
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        // hash plaintext password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        
        // create user record in database with admin role
        const newUser = await UserModel.create({
            ...value,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'admin' // Set role to admin
        });

        // Generate token
        const accessTokenSignup = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        // send registration email to user
        try {
            const emailTemplate = `<p>Welcome, ${value.userName}! Your admin account has been created successfully.</p>`;
            
            await transporter.sendMail({
                from: 'ibrah.webdev@gmail.com',
                to: value.email,
                subject: 'Admin Registration Successful',
                html: emailTemplate,
            });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Continue registration process even if email fails
        }

        // return response
        return res.status(201).json({
            message: "Admin user created successfully!",
            accessTokenSignup,
        });
    } catch (err) {
        console.error("Admin registration error:", err);
        return res.status(500).json({ error: "Registration failed. Please try again." });
    }
}

// Superadmin registration
export const registerSuperAdmin = async (req, res, next) => {
    try {
        // validate user info
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        // Safely access email and username values
        const normalizedEmail = value.email ? value.email.toLowerCase() : value.email;
        const normalizedUserName = value.userName ? value.userName.toLowerCase() : value.userName;

        // check if user doesn't already exist
        const existingUser = await UserModel.findOne({
            $or: [
                { userName: normalizedUserName },
                { email: normalizedEmail }
            ]
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        // hash plaintext password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        
        // create user record in database with superadmin role
        const newUser = await UserModel.create({
            ...value,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'superadmin' // Set role to superadmin
        });

        // Generate token
        const accessTokenSignup = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        // send registration email to user
        try {
            const emailTemplate = `<p>Welcome, ${value.userName}! Your superadmin account has been created successfully.</p>`;
            
            await transporter.sendMail({
                from: 'ibrah.webdev@gmail.com',
                to: value.email,
                subject: 'Superadmin Registration Successful',
                html: emailTemplate,
            });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Continue registration process even if email fails
        }

        // return response
        return res.status(201).json({
            message: "Superadmin user created successfully!",
            accessTokenSignup,
        });
    } catch (err) {
        console.error("Superadmin registration error:", err);
        return res.status(500).json({ error: "Registration failed. Please try again." });
    }
}

export const loginUser = async (req, res, next) => {
    try {
        // Validate login info
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        // Find user by username or email
        const user = await UserModel.findOne({
            $or: [
                { userName: value.userName },
                { email: value.email }
            ]
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = bcrypt.compareSync(value.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { id: user._id, role: user.role || 'buyer'},
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        // Return user data and token
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role || 'buyer'
            },
            accessToken
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Login failed. Please try again." });
    }
};

export const updateUser = async(req, res, next) => {
    try {
        //  Validate request body
        const {error, value} = updateUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }
        
        // Prevent role changes from this endpoint unless by superadmin
        if (value.role && req.auth.role !== 'superadmin') {
            return res.status(403).json({ error: "Role changes not allowed from this endpoint" });
        }
        
        //  Update user in database
        const result = await UserModel.findByIdAndUpdate(
            req.params.id,
            value,
            {new: true }
        ).select({ password: 0 });
        
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // return response
        res.status(200).json(result);
    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: "Update failed. Please try again." });
    }
}

export const getAuthenticatedUser = async (req, res, next) => {
    // Get user by id using req.auth.id
    try {
        const result = await UserModel
              .findById(req.auth.id)
              .select({ password: 0 });
        
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // Return response 
        res.status(200).json(result);
    } catch (error) {
        console.error("Get user error:", error);
        return res.status(500).json({ error: "Failed to retrieve user information" });
    }
}