import { ValidateSchema, Schemas } from './../middleware/ValidateSchema';
import express from 'express';
import controller from '../controllers/Author'

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.createAuthor);
router.get('/get/:id', controller.readAuthor);
router.get('/get', controller.readAllAuthor);
router.patch('/update/:id', ValidateSchema(Schemas.author.update), controller.updateAuthor);
router.delete('/delete/:id', controller.deleteAuthor);

export default router;