import express from 'express';
import controller from '../controllers/books';

const router = express.Router();

router.get('/get/books', controller.getAllBooks);

export = router;
