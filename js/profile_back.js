import bcrypt from 'bcryptjs';
import User from "./User.js";

export const createUserWithDetails = async (userData) => {
    try {
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const createUserRoute = async (req, res) => {
    try {
        const newUser = await createUserWithDetails(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Get a user by email
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }); // Fetch user by email
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user" });
    }
};