import { Router } from 'express';
import chirpsRouter from './chirps';
import dashboardRouter from './dashboard';
import homeRouter from './home';

const router = Router();

router.use('/', homeRouter)
router.use('/chirps', chirpsRouter);  
router.use('/dashboard', dashboardRouter); 

export default router;