import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Book from '../model/Book';

const createBook = (req: Request, res: Response) => {
    const { title, author } = req.body;

    const book = new Book({
        title, author
    });
    return book
        .save()
        .then((book) => res.status(200).json({ message: `book ${book.title} has been added to DB` }))
        .catch((err) => res.sendStatus(400).json({ message: err }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const BookId = req.params.id;

    return Book.findById(BookId)
        .populate('author')
        .select('-__v')
        .then((book) => res.status(200).json({ book }))
        .catch((err) => res.status(400).json({ message: err }));
};

const readAllBook = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((err) => res.status(400).json({ message: err }));
};
const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;

    Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(200).json({ message: `book ${book.title} has been updated` }))
                    .catch((err) => res.status(400).json({ message: err }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((err) => res.status(400).json({ message: err }));
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;

    const book = await Book.findByIdAndDelete(bookId);
    book ? res.status(201).json({ messsage: 'deleted' }) : res.status(404).json({ message: 'not found' });
};

export default { createBook, readBook, readAllBook, updateBook, deleteBook };
