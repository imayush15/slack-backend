import expressAsyncHandler from 'express-async-handler';
import { UserModel } from '../../models';
import bcrypt from 'bcrypt';
import { User } from '../../ts/interface/user';
import jwt from 'jsonwebtoken';

// Signup Controller
export const signupController = expressAsyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
  }: { email: string; firstName: string; lastName: string; password: string } =
    req?.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is Required');
  }
  if (!password) {
    res.status(400);
    throw new Error('Password is Required');
  }
  if (!firstName) {
    res.status(400);
    throw new Error('First Name is Required');
  }
  if (!lastName) {
    res.status(400);
    throw new Error('Last Name is Required');
  }
  const _user = await UserModel.find({ email });
  const _hashedPassword = await bcrypt.hash(password, 10);

  if (_user?.length > 0) {
    res.status(400);
    throw new Error('User Already Exist');
  } else {
    const _createdUser = await UserModel.create({
      ...req?.body,
      password: _hashedPassword,
    });

    if (_createdUser) {
      res.status(201).json(_createdUser);
    } else {
      res.status(400).send({
        message: 'Something went wrong',
      });
    }
  }
});

// Login Controller
export const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password }: { email: string; password: string } = req?.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is Required');
  }
  if (!password) {
    res.status(400);
    throw new Error('Password is Required');
  }

  const _user: User | null = await UserModel.findOne({ email });

  if (!_user) {
    res.status(400);
    throw new Error('Invalid User');
  } else {
    const _isValidPassword = await bcrypt.compare(password, _user?.password);

    if (_isValidPassword) {
      const _accessToken = jwt.sign(
        {
          user: {
            username: `${_user?.firstName} ${_user?.lastName}`,
            email: `${_user?.email}`,
          },
        },
        process.env.JWT_PRIVATE_KEY as string,
        {
          expiresIn: '1d',
        }
      );

      res.status(200).json({
        firstName: _user?.firstName,
        lastName: _user?.lastName,
        _id: _user?._id,
        email: _user?.email,
        accessToken: _accessToken,
      });
    } else {
      res.status(400);
      throw new Error('Invalid email or password');
    }
  }
});

/**
 * Channel
 *  - Create - Name
 *  - List
 *  - Join Channel based on channelId
 *  - Delete Channel
 */
