"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_auth_1 = require("./validation.auth");
const controller_auth_1 = require("./controller.auth");
const router = express_1.default.Router();
// register a user
router.post('/register', (0, validateRequest_1.default)(validation_auth_1.authValidations.userRegistrationValidation), controller_auth_1.authControllers.registerUser);
// login a user
router.post('/login', (0, validateRequest_1.default)(validation_auth_1.authValidations.loginValidationSchema), controller_auth_1.authControllers.loginUser);
exports.userRoute = router;
