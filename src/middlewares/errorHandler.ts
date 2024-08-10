import { Error } from '../ts/enums/error';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _statusCode = res?.statusCode ? res.statusCode : 500;
  let title = '';
  switch (_statusCode) {
    case Error.VALIDATION_ERROR:
      title = 'Validation Error';
      break;
    case Error.UNAUTHORIZED:
      title = 'Unauthorized';
      break;
    case Error.FORBIDDEN:
      title = 'Forbidden';
      break;
    case Error.NOT_FOUND:
      title = 'Not Found';
      break;

    default:
      title = 'Unknown Error';
      break;
  }
  res.status(_statusCode).json({
    title,
    message: err?.message || 'Something went wrong',
  });
};

export default errorHandler;
