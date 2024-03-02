import { IBook } from './../model/Book';
import { IAuthor } from './../model/Author';
// import { ValidateSchema } from './ValidateSchema';
import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from 'express';

export const ValidateSchema = (schema: ObjectSchema ) => {
    return async (req: Request, res: Response, next: NextFunction ) => {
        try {
            await schema.validateAsync(req.body)

            next
        } catch (err) {
            console.error(err)
            return res.status(422).json({ err })
        }
    }
}

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required()
        })
    }
}