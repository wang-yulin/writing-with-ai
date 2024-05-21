import express from 'express';
import signup from './access/signup';
import login from './access/login';
import article from './article';
import comment from './comment';

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);
router.use('/article', article);
router.use('/comment', comment);

export default router;
