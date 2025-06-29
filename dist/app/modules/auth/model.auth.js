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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // select: 0,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'editor', 'reviewer'],
        // required: true,
        default: 'user', // Default role for new users
    },
    credits: {
        type: Number,
        // required: true,
        default: 5, // New users will start with 5 credits
    },
    // passwordChangedAt: { type: Date },
}, { timestamps: true });
// hash the password
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // `this` refers to the document being saved
        const user = this;
        // THIS IS THE FIX:
        // Only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }
        // If the password IS modified, then proceed with hashing
        try {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
// compare bcrypt password for auth
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
// Exclude password field when converting to JSON
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        // delete ret.passwordChangedAt;
        delete ret.__v;
    },
});
// for auth
// find user exists
userSchema.statics.isUserExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ username: name });
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
