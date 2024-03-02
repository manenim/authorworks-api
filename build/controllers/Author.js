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
const Author_1 = __importDefault(require("../model/Author"));
const createAuthor = (req, res) => {
    const { name } = req.body;
    const author = new Author_1.default({
        name,
    });
    return author
        .save()
        .then((author) => res
        .status(200)
        .json({ message: `author ${author.name} has been added to DB` }))
        .catch((err) => res.sendStatus(400).json({ message: err }));
};
const readAuthor = (req, res, next) => {
    const AuthorId = req.params.id;
    return Author_1.default.findById(AuthorId)
        .then((author) => res.status(200).json({ author }))
        .catch((err) => res.status(400).json({ message: err }));
};
const readAllAuthor = (req, res, next) => {
    return Author_1.default.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((err) => res.status(400).json({ message: err }));
};
const updateAuthor = (req, res, next) => {
    const authorId = req.params.id;
    Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res
                .status(200)
                .json({ message: `author ${author.name} has been updated` }))
                .catch((err) => res.status(400).json({ message: err }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((err) => res.status(400).json({ message: err }));
};
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.id;
    const author = yield Author_1.default.findByIdAndDelete(authorId);
    author
        ? res.status(201).json({ messsage: "deleted" })
        : res.status(404).json({ message: "not found" });
});
exports.default = {
    createAuthor,
    readAuthor,
    readAllAuthor,
    updateAuthor,
    deleteAuthor,
};
