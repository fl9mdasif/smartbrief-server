"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: 'username is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const userRegistrationValidation = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(1).max(50),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(5),
        role: zod_1.z.enum(['user', 'admin', 'editor', 'reviewer']),
        // .optional(), // Role is optional, default will be set in the model
        credits: zod_1.z.number().min(0).default(5).optional(), // New users will start with 5 credits
    }),
});
exports.authValidations = {
    loginValidationSchema: exports.loginValidationSchema,
    changePasswordValidationSchema,
    userRegistrationValidation
};
