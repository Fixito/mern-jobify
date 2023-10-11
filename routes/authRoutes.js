import { Router } from 'express';
const router = Router();

import { register, login, logout } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput
} from '../middleware/valdationMiddleware.js';

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: 'Limite de débit IP dépassée, réessayez dans 15 minutes.' }
});

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
