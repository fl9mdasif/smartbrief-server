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
exports.checkCredits = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const model_auth_1 = require("../modules/auth/model.auth");
const checkCredits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req.user should be populated by your JWT authentication middleware
        const userId = req.user._id;
        const user = yield model_auth_1.User.findById(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'f', 'User not found!');
        }
        // Check if the user has enough credits
        if (user.credits < 1) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, ' f', 'Insufficient credits. Please recharge to continue.');
        }
        // Decrement the credit and save. Using $inc is efficient.
        user.credits -= 1;
        yield user.save();
        // If everything is okay, proceed to the next handler (the summarization controller)
        next();
    }
    catch (error) {
        next(error); // Pass error to your global error handler
    }
});
exports.checkCredits = checkCredits;
