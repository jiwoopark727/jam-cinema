import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import communityRouter from './routers/communityRouter';
import searchRouter from './routers/searchRouter';
import newsRouter from './routers/newsRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/community', communityRouter);
app.use('/search', searchRouter);
app.use('/news', newsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
