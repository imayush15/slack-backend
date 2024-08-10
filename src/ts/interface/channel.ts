// src/ts/interface/channel.ts
import { Document, ObjectId } from 'mongoose';

export interface Chat {
  channelId: ObjectId;
  messages: SingleChat[];
}

export interface SingleChat {
  text: string;
  createdAt: Date;
  createdBy: ObjectId;
}

export interface Channel extends Document {
  name: string;
  createdBy: ObjectId;
  messages: SingleChat[];
  otherUsers: ObjectId[];
}
