"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateSchema_1 = require("./../middleware/ValidateSchema");
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controllers/Author"));
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.create), Author_1.default.createAuthor);
router.get('/get/:id', Author_1.default.readAuthor);
router.get('/get', Author_1.default.readAllAuthor);
router.patch('/update/:id', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.update), Author_1.default.updateAuthor);
router.delete('/delete/:id', Author_1.default.deleteAuthor);
exports.default = router;
