import expressAsyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';
import { User, UserBody } from '../../ts/interface/user';
import { UserModel } from '../../models';
import { ChannelModel } from '../../models/channel';
import { ChatModel } from '../../models/chat';
import { SingleChat } from '../../ts/interface/channel';

export const postChat = expressAsyncHandler(async (req, res) => {
  const {
    channelId,
    text,
    user,
  }: { channelId: string; text: string; user: UserBody } = req?.body;

  if (!channelId || !isValidObjectId(channelId)) {
    res.status(400);
    throw new Error('Please check channelId');
  }

  if (!text) {
    res.status(400);
    throw new Error('Please provide a text');
  }

  const _author = await UserModel.findOne({ email: user?.email });

  if (_author) {
    const createdBy = _author?.id;

    const _chat = await ChatModel.findOne({ channelId });

    const _newMessage: SingleChat = {
      createdAt: new Date(),
      createdBy,
      text,
    };
    if (_chat) {
      // update
      const _updatedMessage = await ChatModel.findOneAndUpdate(
        { channelId },
        { messages: [..._chat?.messages, _newMessage] }
      )
        .then((updatedMessage) => {
          res.status(200);
          res.json({ ..._newMessage });
        })
        .catch((err) => {
          res.status(400);
          throw new Error(err);
        });
    } else {
      console.log('in else');

      // create
      const newChatCreated = await ChatModel.create({
        channelId,
        messages: [{ text, createdAt: new Date(), createdBy }],
      });
      console.log({ newChatCreated });

      if (newChatCreated) {
        res.status(201);
        res.json(newChatCreated);
      } else {
        res.status(400);
        throw new Error('Something went wrong');
      }
    }
  } else {
    res.status(400);
    throw new Error('User not found');
  }
  res.status(200);
});
