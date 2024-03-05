import express from "express";
import controller from "../controllers/Author";
import { Schemas, ValidateSchema } from "./../middleware/ValidateSchema";

const router = express.Router();

/**
 * @openapi
 * /authors/create:
 *  post:
 *    tags:
 *      - Authors
 *    summary: Create a new author with their details.
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
 *        - Authors
 *      summary: Get an Author
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: "65e5b1041f2ce07f17f82960"
 *          required: true
 *          description: Retrieve information about a specific author by their unique identifier.
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
 *      - Authors
 *    summary: Get all Authors
 *    responses:
 *      200:
 *        description: 'Retrieve a list of all authors with their basic information.'
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
 *        - Authors
 *      summary: Update Author Info
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            default: 65e5b1041f2ce07f17f82960
 *      requestBody:
 *        description: Modify the information of an existing author.
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
 *        - Authors
 *      summary: Remove an author and their associated data
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
