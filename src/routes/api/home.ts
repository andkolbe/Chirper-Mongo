import { Router } from 'express';


const router = Router();

router.get('/', (req, res) => {
    try {
        res.render('home')
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message });
    }
})



export default router;