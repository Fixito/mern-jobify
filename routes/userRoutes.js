import { Router } from 'express';
const router = Router();

import {
  authenticateUser,
  authorizePermissions,
  checkForTestUser
} from '../middleware/authenticateUser.js';

import upload from '../middleware/multerMiddleware.js';

import {
  getCurrentUser,
  getApplicationStats,
  updateUser
} from '../controllers/userController.js';

import { validateUpdateUserInput } from '../middleware/valdationMiddleware.js';

router.use(authenticateUser);
router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats
]);
router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);

export default router;
