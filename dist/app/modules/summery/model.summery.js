"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
const mongoose_1 = require("mongoose");
const summarySchema = new mongoose_1.Schema({
    prompt: {
        type: String,
        required: [true, 'Prompt text is required.'],
    },
    summarizedContent: {
        type: String,
        required: [true, 'Summarized content is required.'],
    },
    wordCount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'failed'],
        default: 'completed',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // This creates a reference to your User model
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
exports.Summary = (0, mongoose_1.model)('Summary', summarySchema);
