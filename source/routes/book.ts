import express from 'express';
import controller from '../controllers/books';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', controller.getAllBooks);
router.post('/', extractJWT, controller.createBook);

export = router;
