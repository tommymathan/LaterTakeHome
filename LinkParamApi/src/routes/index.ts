
import { Router } from 'express';
import linksRouter from './links';

const router = Router();

router.use('/', linksRouter); 

export default router;