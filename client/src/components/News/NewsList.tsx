import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../utils/api';

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

const NewsPage = () => {
  const [totalNewsData, setTotalNewsData] = useState<INewsData[]>([]);
  const [visibleNewsData, setVisibleNewsData] = useState<INewsData[]>([]);
  const observerTargetRef = useRef<HTMLDivElement | null>(null); // 마지막 기사를 감지할 div
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemsPerPage = 5; // 한 번에 불러올 뉴스 개수

  // 뉴스 데이터 추가 로드 감지
  useEffect(() => {
    if (!observerTargetRef.current || totalNewsData.length <= visibleNewsData.length) return;

    // 기존 observer가 있다면 disconnect
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (entries[0].isIntersecting) {
            setVisibleNewsData((prev) => totalNewsData.slice(0, prev.length + itemsPerPage));
          }
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(observerTargetRef.current); // div 감지 시작

    return () => observerRef.current?.disconnect(); // ref 초기화
  }, [totalNewsData, visibleNewsData]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 1️⃣ 뉴스 데이터 가져와서 DB 저장
        await axios.get(`${API_URL}/news/fetch-and-store`);

        // 2️⃣ 저장된 뉴스 데이터를 다시 가져오기
        const response = await axios.get(`${API_URL}/news/list`);
        setTotalNewsData(response.data);
        setVisibleNewsData(response.data.slice(0, itemsPerPage)); // 처음 5개 불러오기
      } catch (error) {
        console.error('최신 뉴스 기사 가져오기 실패', error);

        // 2️⃣ 기존에 저장되어 있던 뉴스 데이터를 다시 가져오기
        const response = await axios.get(`${API_URL}/news/list`);
        setTotalNewsData(response.data);
        setVisibleNewsData(response.data.slice(0, itemsPerPage)); // 처음 5개 불러오기
      }
    };

    fetchNews();
  }, []);

  return (
    <NewsContainer>
      <br />
      {visibleNewsData.map((val, idx) => {
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
            <StyledLink to={val.content_url} target='_blank' rel='noopener noreferrer'>
              <NewsTitle>{val.title}</NewsTitle>
              <NewsContent>{val.summary}</NewsContent>
            </StyledLink>
            <NewsImage>
              <img src={val.image_url} alt={val.title} />
            </NewsImage>
          </NewsBox>
        );
      })}

      {/* ✅ 감지할 빈 div 추가 */}
      <ObserverTarget ref={observerTargetRef} />
    </NewsContainer>
  );
};

export default NewsPage;

const NewsContainer = styled.div`
  height: auto;
  min-height: 100vh;
`;

const NewsBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  margin: auto;
  height: 200px;
  max-height: 210px;
  width: 70%;
  margin-bottom: 50px;
  border-bottom: 2px solid gray;
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
    object-fit: contain;
  }
`;

// 마지막 기사 감지용 div 스타일
const ObserverTarget = styled.div`
  height: 20px;
  width: 100%;
  margin-bottom: 50px;
`;
