import { Router } from 'express';
import loginRouter from './login';
import logoutRouter from './logout';

const router = Router();

router.use('/', loginRouter);
router.use('/logout', logoutRouter);

export default router;