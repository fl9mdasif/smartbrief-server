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
exports.generateAISummary = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = __importDefault(require("../config"));
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.default.gemini_api_key);
/**
 * Generates a summary for the given text using the Gemini Pro model.
 * @param {string} textToSummarize - The text content to be summarized.
 * @returns {Promise<string>} The summarized text.
 */
const generateAISummary = (textToSummarize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = `Please provide a concise, professional summary of the following text:\n\n---\n${textToSummarize}\n---\n\nSummary:`;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const summary = response.text();
        return summary;
    }
    catch (error) {
        console.error('Error calling Gemini API:', error);
        // In a real app, you might want a more sophisticated error handling/logging mechanism
        throw new Error('Failed to generate summary from the AI service.');
    }
});
exports.generateAISummary = generateAISummary;
