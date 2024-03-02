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
const Book_1 = __importDefault(require("../model/Book"));
const createBook = (req, res) => {
    const { title, author } = req.body;
    const book = new Book_1.default({
        title, author
    });
    return book
        .save()
        .then((book) => res.status(200).json({ message: `book ${book.title} has been added to DB` }))
        .catch((err) => res.sendStatus(400).json({ message: err }));
};
const readBook = (req, res, next) => {
    const BookId = req.params.id;
    return Book_1.default.findById(BookId)
        .populate('author')
        .select('-__v')
        .then((book) => res.status(200).json({ book }))
        .catch((err) => res.status(400).json({ message: err }));
};
const readAllBook = (req, res, next) => {
    return Book_1.default.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((err) => res.status(400).json({ message: err }));
};
const updateBook = (req, res, next) => {
    const bookId = req.params.id;
    Book_1.default.findById(bookId)
        .then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(200).json({ message: `book ${book.title} has been updated` }))
                .catch((err) => res.status(400).json({ message: err }));
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    })
        .catch((err) => res.status(400).json({ message: err }));
};
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const book = yield Book_1.default.findByIdAndDelete(bookId);
    book ? res.status(201).json({ messsage: 'deleted' }) : res.status(404).json({ message: 'not found' });
});
exports.default = { createBook, readBook, readAllBook, updateBook, deleteBook };
