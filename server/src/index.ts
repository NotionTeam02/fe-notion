import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Article from './models/Article.js';
import articleRouter from './routes/articleRouter.js';
import { Server } from 'socket.io';
import setupSocket from './setup/socketSetup.js';
import { mockArticle } from './setup/mockArticle.js';
import { setupMongoDB } from './setup/dbSetup.js';

export interface CustomRequest extends Request {
  io: Server;
}

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || '';
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupMongoDB(MONGO_DB_URL).then((db) => {
  console.log('mongoDB connected');
  initializeDb();
});

const { server, io } = setupSocket(app);

app.use(
  '/api/article',
  (req, res, next) => {
    (req as unknown as CustomRequest).io = io;
    next();
  },
  articleRouter
);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const initializeDb = async () => {
  await Article.deleteMany();
  const articleCount = await Article.countDocuments();

  if (articleCount === 0) {
    try {
      await Article.insertMany(mockArticle);
      console.log('article successfully initialized');
    } catch (error) {
      console.error(error);
    }
  }
};
