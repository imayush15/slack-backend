import mongoose, { Model } from 'mongoose';
import { Channel } from '../ts/interface/channel';

const channelSchema = new mongoose.Schema<Channel>({
  name: {
    type: String,
    required: [true, 'Channel name is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'CreatedBy is required'],
  },
  otherUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const ChannelModel: Model<Channel> = mongoose.model<Channel>(
  'Channel',
  channelSchema
);
