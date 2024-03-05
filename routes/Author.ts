import express from "express";
import controller from "../controllers/Author";
import { Schemas, ValidateSchema } from "./../middleware/ValidateSchema";

const router = express.Router();

/**
 * @openapi
 * /authors/create:
 *  post:
 *    tags:
 *      - Author
 *    summary: Create an Author
 *    requestBody:
 *      description: create an Author
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: Mary Jane
 *    responses:
 *      201:
 *        description: 'Ok'
 *      400:
 *        description: 'Bad Request'
 */
router.post(
  "/create",
  ValidateSchema(Schemas.author.create),
  controller.createAuthor
);

/**
 * @openapi
 * paths:
 *  /authors/{id}:
 *    get:
 *      tags:
 *        - Author
 *      summary: Get an Author
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: "65e5b1041f2ce07f17f82960"
 *          required: true
 *          description: unique ID Of the author to get
 *      responses:
 *        200:
 *          description: 'Author with given ID'
 *        400:
 *          description: 'Bad Request'
 */
router.get("/:id", controller.readAuthor);

/**
 * @openapi
 * /authors/:
 *  get:
 *    tags:
 *      - Author
 *    summary: Get all Authors
 *    responses:
 *      200:
 *        description: 'A list of authors'
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *            example:
 *              id: "65e5b4925fed3c6fb66daab9"
 *              name: Melinda May
 *      400:
 *        description: 'Bad Request'
 */
router.get("/", controller.readAllAuthor);

/**
 * @openapi
 * paths:
 *  /authors/update/{id}:
 *    patch:
 *      tags:
 *        - Author
 *      summary: Update Author Info
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: 65e5b1041f2ce07f17f82960
 *      requestBody:
 *        description: Update Author
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  default: Lumber Marr
 *      responses:
 *        201:
 *          description: 'An updated author'
 *        400:
 *          description: 'Bad Request'
 */
router.patch(
  "/update/:id",
  ValidateSchema(Schemas.author.update),
  controller.updateAuthor
);

/**
 * @openapi
 * paths:
 *  /authors/delete/{id}:
 *    delete:
 *      tags:
 *        - Author
 *      summary: Delete an Author
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
 *          description: 'Author has been deleted'
 *        400:
 *          description: 'Bad Request'
 */
router.delete("/delete/:id", controller.deleteAuthor);

export default router;
