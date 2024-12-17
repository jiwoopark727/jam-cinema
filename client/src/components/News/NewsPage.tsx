import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface INewsData {
  author: string;
  companies: string[];
  content_url: string;
  entities: string[];
  esg: string | null;
  id: string;
  image_url: string;
  published_at: string;
  publisher: string;
  sections: string[];
  summary: string;
  thumbnail_url: string;
  title: string;
}

const NewsPage = () => {
  const [newsData, setNewsData] = useState<INewsData[]>();
  useEffect(() => {
    axios
      .get('http://localhost:8001/news/list')
      .then((res) => {
        setNewsData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(newsData);
  }, [newsData]);

  return (
    <NewsContainer>
      <br />
      <br />
      <br />
      {newsData?.map((val, idx) => {
        function formatDate(isoDate: string): string {
          const date = new Date(isoDate);
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          const hh = String(date.getHours()).padStart(2, '0');
          const min = String(date.getMinutes()).padStart(2, '0');
          const ss = String(date.getSeconds()).padStart(2, '0');

          return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
        }

        const formattedDate = formatDate(val.published_at);

        return (
          <NewsBox key={idx}>
            <NewsPublisher className='publisher'>
              {val.publisher}
              <span style={{ marginLeft: '15px' }}>{formattedDate}</span>
            </NewsPublisher>
            <a href={val.content_url} target='_blank' rel='news_url'>
              <NewsTitle className='title'>{val.title}</NewsTitle>
              <NewsContent className='content'>{val.summary}</NewsContent>
            </a>
            <NewsImage>
              <img src={val.image_url} alt={val.title} />
            </NewsImage>
          </NewsBox>
        );
      })}
    </NewsContainer>
  );
};
export default NewsPage;

const NewsContainer = styled.div`
  height: 80vh;
  overflow: hidden;
`;

const NewsBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr; /* 왼쪽 3: 오른쪽 1 비율 */
  grid-template-rows: repeat(3, 1fr); /* 세로로 3개 나누기 */
  margin: auto;
  height: 170px;
  width: 70%;
  border-bottom: 2px solid gray;
  margin-bottom: 20px;
  padding-bottom: 5px;
`;

const NewsPublisher = styled.div`
  /* border: 2px solid black; */
  margin-left: 5px;
  margin-bottom: 3px;
  color: #686868;
  font-size: 15px;
  height: 20px;
`;

const NewsTitle = styled.div`
  /* border: 2px solid black; */
  color: #4939fc;
  font-size: 23px;
  height: 40px;
`;

const NewsContent = styled.div`
  /* border: 2px solid black; */
  color: black;
  font-size: 19px;
  height: 110px;
`;

const NewsImage = styled.div`
  grid-column: 2;
  grid-row: 1 / span 3;
  margin: 11px 30px 11px 30px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-bottom: 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain; /* 이미지가 박스 크기에 맞게 조정됨, 공백이 생길 수 있음 */
  }
`;
