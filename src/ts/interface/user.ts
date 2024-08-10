import { Document } from 'mongoose';

interface UserCred {
  email: string;
  password: string;
}

export interface User extends UserCred, Document {
  firstName: string;
  lastName: string;
}

export interface UserBody extends UserCred {}
