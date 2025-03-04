import express from 'express';
import { db } from '../db';
import dotenv from 'dotenv';

dotenv.config();
const newsRouter = express.Router();

const news_api_key = process.env.news_api_key;

// 1. 뉴스 API에서 데이터 가져와 DB에 저장
newsRouter.get('/fetch-and-store', async (req, res) => {
  const url = `https://api-v2.deepsearch.com/v1/articles?keyword=영화&page_size=30&api_key=${news_api_key}`;

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.data; // 뉴스 데이터 배열

    if (!articles || articles.length === 0) {
      return res.status(400).json({ error: 'No articles found' });
    }

    // 현재 저장된 뉴스 개수 가져오기
    const currentCount = await new Promise<number>((resolve, reject) => {
      db.query('SELECT COUNT(*) AS count FROM news', [], (err, result) => {
        if (err) reject(err);
        resolve(result[0].count);
      });
    });

    // 중복 체크를 위한 ID 리스트 가져오기
    const existingIds = new Set();
    const existingRows = await new Promise<any[]>((resolve, reject) => {
      db.query('SELECT id FROM news', [], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    existingRows.forEach((row) => existingIds.add(row.id));

    // 새로운 뉴스 필터링 (중복 제거)
    const newArticles = articles.filter((article: any) => !existingIds.has(article.id));

    // 초과될 개수 계산
    const excessCount = Math.max(0, currentCount + newArticles.length - 100);

    // 가장 오래된 데이터 삭제 (초과 개수만큼)
    if (excessCount > 0) {
      await new Promise<void>((resolve, reject) => {
        db.query(`DELETE FROM news ORDER BY published_at ASC LIMIT ?`, [excessCount], (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    }

    // 새로운 뉴스만 삽입
    const insertPromises = articles
      .filter((article: any) => !existingIds.has(article.id)) // 중복 제거
      .map((article: any) => {
        return new Promise<void>((resolve, reject) => {
          const sql = `
            INSERT INTO news (id, title, summary, content_url, image_url, thumbnail_url, published_at, publisher)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

          db.query(
            sql,
            [
              article.id,
              article.title,
              article.summary,
              article.content_url,
              article.image_url,
              article.thumbnail_url,
              article.published_at,
              article.publisher,
            ],
            (err) => {
              if (err) reject(err);
              resolve();
            }
          );
        });
      });

    await Promise.all(insertPromises); // 모든 삽입 작업 완료

    res.json({
      message: `${insertPromises.length} articles stored successfully`,
    });
  } catch (error) {
    console.error('Error fetching or storing data:', error);
    res.status(500).json({ error: 'Failed to fetch and store news' });
  }
});

// 2. DB에서 뉴스 리스트 가져오기
newsRouter.get('/list', (req, res) => {
  db.query('SELECT * FROM news ORDER BY published_at DESC', [], (err, result) => {
    if (err) {
      res.status(500).json('뉴스 리스트 불러오기 실패');
      throw err;
    } else {
      res.json(result);
    }
  });
});

export default newsRouter;
