// 데이터베이스 연결하기
import mysql from 'mysql';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'jam-cinema',
  connectionLimit: 10,
});
