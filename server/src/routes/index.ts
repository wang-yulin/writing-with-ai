import express from 'express';
import signup from './access/signup';
import login from './access/login';
import article from './article';

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);
router.use('/article', article);

export default router;
