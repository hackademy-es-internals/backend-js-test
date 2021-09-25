import express from 'express';
import controller from '../controllers/users';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.getAllUsers);

// by me
router.get('/:userId', extractJWT, controller.getUser);

export = router;
