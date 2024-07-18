import express, { Request, Response } from 'express';
// import path from 'path';
import cors from 'cors';
import authRouter from './routers/authRouter';
// import foodRouter from './routers/foodRouter';

const app = express();
const PORT = process.env.PORT || 8001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'build')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRouter);
// app.use('/food', foodRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
