import { Router } from 'express';
import googleRouter from './google';
import loginRouter from './login';
import logoutRouter from './logout';

const router = Router();

router.use('/google', googleRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

export default router;