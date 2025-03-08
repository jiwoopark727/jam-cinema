import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RNSWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 39px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  color: ${(props) => props.theme.textColor};

  .title {
    font-size: 27px;
    font-weight: 400;
  }

  .more {
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
`;

const NewsCotainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-top: 30px;

  .news_box {
    background-color: #f3f3f3;
    width: 276px;
    height: 276px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 이미지가 넘치지 않도록 */
  }

  .news_image {
    height: 60%; /* 상단 절반을 이미지로 */
    background-size: cover;
    background-position: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .news_text {
    padding: 2px 10px 10px 10px;
    font-size: 14px;
    text-align: left;
    color: #777;
  }

  .news_source {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
`;

interface INewsData {
  id: string;
  publisher: string;
  published_at: string;
  title: string;
  summary: string;
  image_url: string;
  content_url: string;
  thumbnail_url: string;
}

export const RecentNewsSection = () => {
  const [newsData, setNewsData] = useState<INewsData[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 1️⃣ 뉴스 데이터 가져와서 DB 저장
        await axios.get('http://localhost:8001/news/fetch-and-store');

        // 2️⃣ 저장된 뉴스 데이터를 다시 가져오기
        const response = await axios.get('http://localhost:8001/news/list');
        console.log('메인페이지 뉴스 기사 4개', response.data.slice(0, 4));
        setNewsData(response.data.slice(0, 4)); // 처음 4개 불러오기
      } catch (error) {
        console.error('최신 뉴스 기사 가져오기 실패', error);

        // 2️⃣ 기존에 저장되어 있던 뉴스 데이터를 다시 가져오기
        const response = await axios.get('http://localhost:8001/news/list');
        console.log('메인페이지 뉴스 기사 4개', response.data.slice(0, 4));
        setNewsData(response.data.slice(0, 4)); // 처음 4개 불러오기
      }
    };

    fetchNews();
  }, []);

  return (
    <RNSWrapper>
      <HeaderContainer>
        <span className='title'>
          최신 영화 뉴스
          <FontAwesomeIcon style={{ marginLeft: '7px' }} icon={faNewspaper} />
        </span>
        <span className='more'>더보기 +</span>
      </HeaderContainer>
      <NewsCotainer>
        {newsData.map((val, idx) => {
          return (
            <div className='news_box' key={idx}>
              <img
                className='news_image'
                style={{
                  objectFit: 'cover',
                  scale: '95%',
                }}
                src={val.image_url}
              ></img>
              <div className='news_text'>
                <div className='news_source'>{val.title}</div>
                <div>{val.summary.slice(0, 44)}.....</div>
              </div>
            </div>
          );
        })}
      </NewsCotainer>
    </RNSWrapper>
  );
};
