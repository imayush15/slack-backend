import { Router } from 'express';
import {
  channelDetailController,
  createChannelController,
} from '../../controllers/channel';

const router = Router();

/**
 * @description Create Channle
 * @route POST /channel/create
 * @access private
 */
router.post('/create', createChannelController);
router.get('/:channelId/', channelDetailController);

export default router;
