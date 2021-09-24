import express from 'express';
import controller from '../controllers/books';

const router = express.Router();

router.get('/get/books', controller.getAllBooks);
router.post('/create/book', controller.createBook);

export = router;
