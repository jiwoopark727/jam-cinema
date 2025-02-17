import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface INewsData {
  id: string;
  publisher: string;
  published_at: string;
  title: string;
  summary: string;
  image_url: string;
  content_url: string;
  thumbnail_url: string;
  // author: string;
  // companies: string[];
  // entities: string[];
  // esg: string | null;
  // sections: string[];
}

const NewsPage = () => {
  const [newsData, setNewsData] = useState<INewsData[]>([]);
  const [check, setCheck] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8001/news/fetch-and-store')
      .then((res) => {
        console.log(res);
        setCheck(1);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8001/news/list')
      .then((res) => {
        console.log(res);
        setNewsData(res.data);
      })
      .catch((err) => console.log(err));
  }, [check]);

  useEffect(() => {
    console.log(newsData);
  }, [newsData]);

  return (
    <NewsContainer>
      {newsData.map((val, idx) => {
        function formatDate(isoDate: string): string {
          const date = new Date(isoDate);
          return date.toISOString().split('T')[0];
        }
        return (
          <NewsBox key={idx}>
            <NewsPublisher>
              {val.publisher}
              <span>{formatDate(val.published_at)}</span>
            </NewsPublisher>
            <StyledLink
              to={val.content_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <NewsTitle>{val.title}</NewsTitle>
              <NewsContent>{val.summary}</NewsContent>
            </StyledLink>
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
  height: 115vh;
  /* overflow: hidden; */
`;

const NewsBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr; // 왼쪽 3: 오른쪽 1 비율
  grid-template-rows: repeat(3, 1fr); // 세로로 3개 나누기
  margin: auto;
  height: 200px;
  max-height: 210px;
  width: 70%;
  margin-bottom: 50px;
`;

const NewsPublisher = styled.div`
  margin-left: 5px;
  margin-bottom: 3px;
  color: #686868;
  font-size: 15px;
  height: 20px;
`;

const StyledLink = styled(Link)``;

const NewsTitle = styled.div`
  color: #4939fc;
  font-size: 23px;
  height: 40px;
`;

const NewsContent = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 19px;
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
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
    object-fit: contain; // 이미지가 박스 크기에 맞게 조정됨, 공백이 생길 수 있음
  }
`;
