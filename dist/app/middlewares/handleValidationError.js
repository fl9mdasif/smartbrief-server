"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleValidationError = (err) => {
    const statusCode = 400;
    // console.log(err);
    return {
        statusCode,
        message: 'Validation Error',
        errorDetails: err,
    };
};
exports.default = handleValidationError;
