import express from 'express';
import signup from './access/signup';
import login from './access/login';

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);

export default router;
