import { Router } from 'express';
import { receiveEmail, classifyAndRespond } from '../controllers/emailController';

const router = Router();

router.post('/receive', receiveEmail);
router.post('/classify', classifyAndRespond);

export { router as emailRoutes };
