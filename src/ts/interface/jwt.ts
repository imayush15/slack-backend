import { JwtPayload } from 'jsonwebtoken';
import { User } from './user';

export interface CustomJwtPayload extends JwtPayload {
  user: User;
}
