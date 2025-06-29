"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const model_auth_1 = require("../auth/model.auth");
// 1. Get a list of all users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_auth_1.User.find({}).select('-password').sort({ createdAt: -1 });
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Users retrieved successfully!',
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
// 2. Recharge credits for a specific user
const rechargeUserCredits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, amount } = req.body;
        if (!userId || !amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'A valid userId and a positive amount are required.',
            });
        }
        const updatedUser = yield model_auth_1.User.findByIdAndUpdate(userId, { $inc: { credits: amount } }, // Atomically increment credits
        { new: true, select: '-password' } // Return the updated doc without the password
        );
        if (!updatedUser) {
            return res.status(http_status_1.default.NOT_FOUND).json({ success: false, message: 'User not found.' });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `Successfully added ${amount} credits to ${updatedUser.username}.`,
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
// 3. Change a user's role
const changeUserRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.body;
        const allowedRoles = ['user', 'admin', 'editor', 'reviewer'];
        // --- Validation ---
        if (!userId || !role) {
            return res.status(http_status_1.default.BAD_REQUEST).json({ success: false, message: 'userId and role are required.' });
        }
        if (!allowedRoles.includes(role)) {
            return res.status(http_status_1.default.BAD_REQUEST).json({ success: false, message: 'Invalid role specified.' });
        }
        // --- Security: Prevent an admin from changing their own role or another admin's role ---
        const userToUpdate = yield model_auth_1.User.findById(userId);
        if (userToUpdate && userToUpdate.role === 'admin') {
            return res.status(http_status_1.default.FORBIDDEN).json({ success: false, message: 'Admin roles cannot be changed from this panel.' });
        }
        const updatedUser = yield model_auth_1.User.findByIdAndUpdate(userId, { role: role }, // Set the new role
        { new: true, select: '-password' });
        if (!updatedUser) {
            return res.status(http_status_1.default.NOT_FOUND).json({ success: false, message: 'User not found.' });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `${updatedUser.username}'s role has been updated to ${updatedUser.role}.`,
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AdminControllers = {
    getAllUsers,
    rechargeUserCredits,
    changeUserRole
};
