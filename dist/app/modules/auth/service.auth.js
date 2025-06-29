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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const model_auth_1 = require("./model.auth");
const jwt_1 = require("./jwt");
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create
    const register = yield model_auth_1.User.create(payload);
    return register;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    // 1. checking if the user is exist
    const user = yield model_auth_1.User.isUserExists(payload.username);
    // console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, '', `This user is not found !'`);
    }
    //   2. checking if the password is correct
    if (!(yield model_auth_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, '', `Password of '${user.role}' do not matched`);
    // But you are creating this larger shape:
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        username: user.username,
        email: user.email,
        role: user.role, // Can be 'editor', 'reviewer', etc.
        credits: user.credits,
        // passwordChangedAt: user.passwordChangedAt,
    };
    console.log('jwt', config_1.default.jwt_access_expires_in, jwtPayload);
    // create token
    const accessToken = (0, jwt_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    // refresh token
    const refreshToken = (0, jwt_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        data: { jwtPayload },
        accessToken,
        refreshToken,
    };
});
exports.authServices = {
    loginUser,
    registerUser
};
