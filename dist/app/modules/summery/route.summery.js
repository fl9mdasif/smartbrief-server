"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkCredits_1 = require("../../middlewares/checkCredits");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const controller_summery_1 = require("./controller.summery");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
; // Your JWT auth middleware
const router = express_1.default.Router();
// Route to create a new summary
router.post('/', (0, auth_1.default)('user', 'admin', 'editor', 'reviewer'), // Any logged-in user can create
(0, catchAsync_1.default)(checkCredits_1.checkCredits), (0, catchAsync_1.default)(controller_summery_1.SummaryControllers.createSummary));
// Route to get a user's own summary history
router.get('/', (0, auth_1.default)('user', 'admin', 'editor', 'reviewer'), // Any logged-in user can get their history
controller_summery_1.SummaryControllers.getUserSummaries);
router.patch('/:id', (0, auth_1.default)('admin', 'editor'), // User must be logged in
checkCredits_1.checkCredits, // This action costs 1 credit
(0, catchAsync_1.default)(controller_summery_1.SummaryControllers.updateSummary));
// Route to delete a summary
router.delete('/:id', (0, auth_1.default)('admin', 'editor'), // Reviewers cannot delete
(0, catchAsync_1.default)(controller_summery_1.SummaryControllers.deleteSummary));
router.patch('/:id/re-prompt', // New, specific path
(0, auth_1.default)('admin', 'editor'), checkCredits_1.checkCredits, // This action costs 1 credit
(0, catchAsync_1.default)(controller_summery_1.SummaryControllers.repromptSummary));
exports.SummaryRoutes = router;
