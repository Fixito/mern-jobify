import { Router } from 'express';
const router = Router();

import {
  authenticateUser,
  checkForTestUser
} from '../middleware/authenticateUser.js';

import {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats
} from '../controllers/jobController.js';

import {
  validateJobInput,
  validateIdParam
} from '../middleware/valdationMiddleware.js';

router.use(authenticateUser);
router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
