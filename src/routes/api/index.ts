import { Router } from 'express';
import chirpsRouter from './chirps';
import homeRouter from './home';

const router = Router();

router.use('/', homeRouter)
router.use('/chirps', chirpsRouter); // /api/chirps/

export default router;