import 'dotenv/config';
import cors from "cors";
import express from "express";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectToDB } from "./config/mongoose";
import authRouter from "./routes/auth.routes";
import { generatePost } from "./controllers/posts.controller";
import postsRouter from "./routes/posts.routes";
import checkAuth from "./middlewares/checkAuth";
import rateLimit from "express-rate-limit";

const port = process.env.PORT || 5000;
const app = express();
morgan.token('host', (req: express.Request) => {
  return req.hostname;
});
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: {
      message: 'Too many requests. Please try again later.',
      code: 429,
    },
  },
});
app.options('*', cors({ origin: process.env.CLIENT_URL, credentials: true }));

connectToDB();

app.use(morgan(':method :host :status :res[content-length] - :response-time ms'))
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.post('/generate', generateLimiter, checkAuth, generatePost);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});