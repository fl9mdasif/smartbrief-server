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
exports.SummaryControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ai_service_1 = require("../../utils/ai.service");
const model_summery_1 = require("./model.summery");
const model_auth_1 = require("../auth/model.auth");
// Helper function to count words
const countWords = (str) => {
    if (!str)
        return 0;
    return str.trim().split(/\s+/).length;
};
// 1. Create a new summary
const createSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        // @ts-ignore // Assuming your auth middleware attaches user to req
        const userId = req.user._id;
        // console.log(prompt, userId);
        if (!prompt) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Prompt text is required.',
            });
        }
        const summarizedText = yield (0, ai_service_1.generateAISummary)(prompt);
        const newSummary = yield model_summery_1.Summary.create({
            prompt,
            summarizedContent: summarizedText,
            wordCount: countWords(summarizedText),
            user: userId,
        });
        // Atomically decrement the user's credits and return the new value
        const updatedUser = yield model_auth_1.User.findByIdAndUpdate(userId, { $inc: { credits: -1 } }, { new: true } // This option returns the updated document
        );
        res.status(http_status_1.default.CREATED).json({
            success: true,
            message: 'Summary created successfully!',
            data: {
                summary: newSummary,
                // Send back the new credit count so the UI can update instantly
                updatedCredits: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.credits
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// 3. Delete a summary
const deleteSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // @ts-ignore
        const { _id: userId, role: userRole } = req.user;
        const summary = yield model_summery_1.Summary.findById(id);
        if (!summary) {
            return res.status(http_status_1.default.NOT_FOUND).json({ success: false, message: 'Summary not found' });
        }
        // Check permissions
        if (summary.user.toString() !== userId.toString() && !['admin', 'editor'].includes(userRole)) {
            return res.status(http_status_1.default.FORBIDDEN).json({ success: false, message: 'You are not authorized to perform this action.' });
        }
        yield model_summery_1.Summary.findByIdAndDelete(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Summary deleted successfully!',
        });
    }
    catch (error) {
        next(error);
    }
});
// Add this function inside your SummaryControllers object
const updateSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // The ID of the summary to update
        const { prompt } = req.body; // The new, edited prompt from the user
        // @ts-ignore
        const { _id: userId, role: userRole } = req.user;
        if (!prompt) {
            return res.status(http_status_1.default.BAD_REQUEST).json({ success: false, message: 'A new prompt is required.' });
        }
        const existingSummary = yield model_summery_1.Summary.findById(id);
        if (!existingSummary) {
            return res.status(http_status_1.default.NOT_FOUND).json({ success: false, message: 'Summary not found' });
        }
        // Permission Check: Ensure the user owns this summary
        if (existingSummary.user.toString() !== userId.toString() && userRole !== 'admin') {
            return res.status(http_status_1.default.FORBIDDEN).json({ success: false, message: 'You are not authorized to edit this summary.' });
        }
        // This action costs a credit, which is handled by the `checkCredits` middleware.
        // Generate the new summary content
        const newSummarizedText = yield (0, ai_service_1.generateAISummary)(prompt);
        // Update the existing document in the database
        const updatedSummaryData = {
            prompt,
            summarizedContent: newSummarizedText,
            wordCount: countWords(newSummarizedText),
        };
        const updatedSummary = yield model_summery_1.Summary.findByIdAndUpdate(id, updatedSummaryData, { new: true });
        // Decrement the user's credits
        const updatedUser = yield model_auth_1.User.findByIdAndUpdate(userId, { $inc: { credits: -1 } }, { new: true });
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Summary updated successfully!',
            data: {
                summary: updatedSummary,
                updatedCredits: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.credits,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
const repromptSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { prompt } = req.body;
        // @ts-ignore
        const userId = req.user._id;
        if (!prompt) {
            return res.status(http_status_1.default.BAD_REQUEST).json({ success: false, message: 'A new prompt is required for re-prompting.' });
        }
        // (Permission checks could be added here if needed)
        const newSummarizedText = yield (0, ai_service_1.generateAISummary)(prompt);
        const updatedSummaryData = {
            prompt,
            summarizedContent: newSummarizedText,
            wordCount: countWords(newSummarizedText),
        };
        const updatedSummary = yield model_summery_1.Summary.findByIdAndUpdate(id, updatedSummaryData, { new: true });
        const updatedUser = yield model_auth_1.User.findByIdAndUpdate(userId, { $inc: { credits: -1 } }, { new: true });
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Summary re-prompted successfully!',
            data: { summary: updatedSummary, updatedCredits: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.credits },
        });
    }
    catch (error) {
        next(error);
    }
});
// ... other functions ...
const getUserSummaries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const { _id: userId, role } = req.user;
        let query = {};
        if (role === 'user') {
            query = { user: userId };
        }
        const summaries = yield model_summery_1.Summary.find(query)
            .populate('user', 'username') // Optional: include username in the response
            .sort({ createdAt: -1 });
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Summaries retrieved successfully!',
            data: summaries,
        });
    }
    catch (error) {
        next(error);
    }
});
// Don't forget to export it!
exports.SummaryControllers = {
    createSummary,
    getUserSummaries,
    deleteSummary,
    updateSummary,
    repromptSummary,
};
