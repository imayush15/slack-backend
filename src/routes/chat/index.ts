import { Router } from 'express';
import { postChat } from '../../controllers/chat';

const router = Router();

/**
 * @description Create chat
 * @route POST /chat
 * @access private
 */
router.post('/', postChat);

export default router;
