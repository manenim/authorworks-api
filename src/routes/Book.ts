import { ValidateSchema, Schemas } from './../middleware/ValidateSchema';
import express from 'express';
import controller from '../controllers/Book';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.createBook);
router.get('/get/:id', controller.readBook);
router.get('/get', controller.readAllBook);
router.patch('/update/:id', ValidateSchema(Schemas.author.update), controller.updateBook);
router.delete('/delete/:id', controller.deleteBook);

export default router;
