import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { CustomJwtPayload } from '../ts/interface/jwt';

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  const token = req?.headers?.authorization as string;

  if (!token) {
    res.status(401);
    throw new Error('Please provide a valid token');
  }

  if (token.startsWith('Bearer')) {
    const _tokenKey = token.split(' ')[1];

    jwt.verify(
      _tokenKey,
      process.env.JWT_PRIVATE_KEY as string,
      (err, decoded) => {
        if (err) {
          const _isTokenExpired = err instanceof jwt.TokenExpiredError;
          const _message = _isTokenExpired
            ? 'Token Expired'
            : 'Unauthorized Access';
          const _status = _isTokenExpired ? 400 : 401;

          res.status(_status);
          throw new Error(_message);
        }
        const customDecoded = decoded as CustomJwtPayload;
        req.body = { ...req.body, user: customDecoded?.user };
        next();
      }
    );
  }
});

export default verifyToken;
