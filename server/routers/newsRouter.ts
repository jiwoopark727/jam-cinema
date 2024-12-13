import express from 'express';
import { db } from '../db';
import dotenv from 'dotenv';

dotenv.config();

const newsRouter = express.Router();

const news_api_key = process.env.news_api_key;

newsRouter.get('/list', async (req, res) => {
  const url = `https://api-v2.deepsearch.com/v1/articles?keyword=영화&page_size=20&api_key=${news_api_key}`;

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data); // 클라이언트에 JSON 데이터 전송
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

export default newsRouter;
