import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './db';
import { AuthRoute, ChannelRoute, ChatRoute } from './routes';
import errorHandler from './middlewares/errorHandler';
import verifyToken from './middlewares/verifyToken';

dotenv.config();

// Connection To DB
connectToDB();

const app = express();
const port = process.env.PORT || 8000;

// Parsing the incoming body
app.use(express.json());

// ! Path Start
app.use('/auth', AuthRoute);
app.use('/channel', verifyToken, ChannelRoute);
app.use('/chat', verifyToken, ChatRoute);

// ! Path End

// Error Handler
app.use(errorHandler);

// Listener
app.listen(port, (err?: any) => {
  if (err) {
    console.error('Failed to start server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
