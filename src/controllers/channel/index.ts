import expressAsyncHandler from 'express-async-handler';
import { ChannelModel } from '../../models/channel';
import { UserModel } from '../../models';
import { User } from '../../ts/interface/user';
import { ChatModel } from '../../models/chat';
import { Channel } from '../../ts/interface/channel';

export const createChannelController = expressAsyncHandler(async (req, res) => {
  const { name, user }: { name: string; user: User } = req?.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a name');
  }

  const _isExistingChannel = await ChannelModel.find({ name });

  if (_isExistingChannel.length > 0) {
    res.status(403);
    throw new Error('Channel already exists');
  }

  const foundUser = await UserModel.findOne({ email: user.email });

  if (!foundUser) {
    res.status(404);
    throw new Error('User not found');
  }

  const newChannel = await ChannelModel.create({
    name,
    createdBy: foundUser._id,
  });

  if (newChannel) {
    res.status(201);
    res.json(newChannel);
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

export const channelDetailController = expressAsyncHandler(async (req, res) => {
  const { channelId } = req?.params;

  if (!channelId) {
    res.status(400);
    throw new Error('Please Provide Channel Id');
  }
  console.log({ channelId });
  const foundChannel = await ChannelModel.findById(channelId);
  const chatForChannel = await ChatModel.find({ channelId });
  console.log({ foundChannel });
  if (foundChannel) {
    const messages =
      chatForChannel.length > 0 ? [...chatForChannel[0]?.messages] : [];

    const response = { ...foundChannel, messages: [...messages] };

    res.status(200).json({
      _id: foundChannel?.id,
      name: foundChannel?.name,
      createdBy: foundChannel?.createdBy,
      otherUsers: foundChannel?.otherUsers,
      messages: [...messages],
    });
  } else {
    res.status(404);
    throw new Error('Channel not found');
  }
});
