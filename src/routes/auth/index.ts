import { Router } from 'express';
import { loginController, signupController } from '../../controllers/auth';

const router = Router();

/**
 * @description For users to signup
 * @route POST /auth/signup
 * @access public
 */
router.post('/signup', signupController);

/**
 * @description For users to login
 * @route POST /auth/login
 * @access public
 */
router.post('/login', loginController);

export default router;
