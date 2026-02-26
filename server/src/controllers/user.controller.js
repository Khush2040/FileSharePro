import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

/**
 * @desc Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        // Add a mock lastActive field since it's not in the schema currently
        const usersWithActivity = users.map(user => ({
            ...user.toObject(),
            lastActive: user.updatedAt || new Date()
        }));

        res.json(usersWithActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Delete user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await User.deleteOne({ _id: user._id });
            res.json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Update user role
 * @route PUT /api/users/:id/role
 * @access Private/Admin
 */
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);

        if (user) {
            user.role = role || user.role;
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                lastActive: updatedUser.updatedAt
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Invite/Create a user
 * @route POST /api/users/invite
 * @access Private/Admin
 */
export const inviteUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash a generic default password for invited users, they would normally reset it via email link
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Welcome123!", salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            lastActive: user.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
