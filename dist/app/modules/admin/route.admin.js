"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_admin_1 = require("./controller.admin");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Get all users - ONLY ADMINS
router.get('/users', (0, auth_1.default)('admin'), controller_admin_1.AdminControllers.getAllUsers);
// Recharge user credits - ONLY ADMINS
router.patch('/users/recharge-credits', (0, auth_1.default)('admin'), (0, catchAsync_1.default)(controller_admin_1.AdminControllers.rechargeUserCredits));
// Change user role - ONLY ADMINS
router.patch('/users/change-role', (0, auth_1.default)('admin'), (0, catchAsync_1.default)(controller_admin_1.AdminControllers.changeUserRole));
exports.AdminRoutes = router;
