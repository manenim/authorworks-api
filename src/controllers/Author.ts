import { NextFunction, Request, Response } from "express";
import Author from "../model/Author";

const createAuthor = (req: Request, res: Response) => {
  const { name } = req.body;

  const author = new Author({
    name,
  });
  return author
    .save()
    .then((author) =>
      res
        .status(200)
        .json({ message: `author ${author.name} has been added to DB` })
    )
    .catch((err) => res.sendStatus(400).json({ message: err }));
};

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const AuthorId = req.params.id;

  return Author.findById(AuthorId)
    .then((author) => res.status(200).json({ author }))
    .catch((err) => res.status(400).json({ message: err }));
};

const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
  return Author.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((err) => res.status(400).json({ message: err }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;

  Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body);

        return author
          .save()
          .then((author) =>
            res
              .status(200)
              .json({ message: `author ${author.name} has been updated` })
          )
          .catch((err) => res.status(400).json({ message: err }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => res.status(400).json({ message: err }));
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.id;

  const author = await Author.findByIdAndDelete(authorId);
  author
    ? res.status(201).json({ messsage: "deleted" })
    : res.status(404).json({ message: "not found" });
};

export default {
  createAuthor,
  readAuthor,
  readAllAuthor,
  updateAuthor,
  deleteAuthor,
};
