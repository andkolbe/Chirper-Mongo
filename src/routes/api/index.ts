import { Router } from 'express';
import chirpsRouter from './chirps';

const router = Router();

router.use('/chirps', chirpsRouter); // /api/chirps/

export default router;