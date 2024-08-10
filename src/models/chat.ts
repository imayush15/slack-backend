import mongoose from 'mongoose';
import { Chat, SingleChat } from '../ts/interface/channel';

const singleMessageSchema = new mongoose.Schema<SingleChat>({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const chatSchema = new mongoose.Schema<Chat>({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  },
  messages: [singleMessageSchema],
});

export const ChatModel = mongoose.model('chats', chatSchema);
