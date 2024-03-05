import { ValidateSchema, Schemas } from './../middleware/ValidateSchema';
import express from 'express';
import controller from '../controllers/Book';

const router = express.Router();

/**
 * @openapi
 * /books/create:
 *  post:
 *    tags:
 *      - Books
 *    summary: Add a Book
 *    requestBody:
 *      description: Add a new book with their details.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                default: The Impossible Danger
 *              author:
 *                type: string
 *                default: Andres Dan
 *    responses:
 *      201:
 *        description: 'Added a Book'
 *      400:
 *        description: 'Bad Request'
 */
router.post('/create', ValidateSchema(Schemas.author.create), controller.createBook);

/**
 * @openapi
 * paths:
 *  /books/{id}:
 *    get:
 *      tags:
 *        - Books
 *      summary: Get an Book
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: "65e5b1041f2ce07f17f82960"
 *          required: true
 *          description: unique ID Of the Book to get
 *      responses:
 *        200:
 *          description: 'Book with given ID'
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  author:
 *                    type: string
 *                example:
 *                    id: "65e5b4925fed3c6fb66daab9"
 *                    title: "The Impossible Danger"
 *                    author: Melinda May
 *        400:
 *          description: 'Bad Request'
 */
router.get('/:id', controller.readBook);

/**
 * @openapi
 * /books/:
 *  get:
 *    tags:
 *      - Books
 *    summary: Get all Books
 *    responses:
 *      200:
 *        description: 'A list of books with its corresponding authors'
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *              properties:
 *                id:
 *                  type: string
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *            example:
 *              id: "65e5b4925fed3c6fb66daab9"
 *              title: "The Obstacle is the way"
 *              name: Melinda May
 *      400:
 *        description: 'Bad Request'
 */
router.get('/', controller.readAllBook);

/**
 * @openapi
 * paths:
 *  /books/update/{id}:
 *    patch:
 *      tags:
 *        - Books
 *      summary: Update Book Info
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: 65e5b1041f2ce07f17f82960
 *      requestBody:
 *        description: Update Book information
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  default: Eloquent Javascript
 *                Author:
 *                  type: string
 *                  default: Sergey Grinn
 *      responses:
 *        201:
 *          description: 'An updated Book'
 *        400:
 *          description: 'Bad Request'
 */
router.patch('/update/:id', ValidateSchema(Schemas.author.update), controller.updateBook);

/**
 * @openapi
 * paths:
 *  /books/delete/{id}:
 *    delete:
 *      tags:
 *        - Books
 *      summary: Delete a Book
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: "65e5b1041f2ce07f17f82960"
 *          required: true
 *          description: unique ID Of the author to be deleted
 *      responses:
 *        200:
 *          description: 'Book has been deleted'
 *        400:
 *          description: 'Bad Request'
 */
router.delete('/delete/:id', controller.deleteBook);

export default router;
