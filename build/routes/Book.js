"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateSchema_1 = require("./../middleware/ValidateSchema");
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../controllers/Book"));
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.create), Book_1.default.createBook);
router.get('/get/:id', Book_1.default.readBook);
router.get('/get', Book_1.default.readAllBook);
router.patch('/update/:id', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.update), Book_1.default.updateBook);
router.delete('/delete/:id', Book_1.default.deleteBook);
exports.default = router;
