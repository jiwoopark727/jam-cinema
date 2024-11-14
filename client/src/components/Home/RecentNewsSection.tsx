import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
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
    padding: 10px;
    font-size: 16px;
    text-align: left;
    color: #333;
  }

  .news_source {
    font-size: 12px;
    color: #777;
    margin-bottom: 5px;
  }
`;

export const RecentNewsSection = () => {
  const newsArray = [
    [1, '베놈'],
    [2, '대도시의 사랑법'],
    [3, '조커'],
    [4, '보통의가족'],
  ];
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
        {newsArray.map((val, idx) => {
          return (
            <div className='news_box' key={idx}>
              <div
                className='news_image'
                style={{
                  backgroundImage: `url('../../images/examplePoster/poster${
                    idx + 1
                  }.png')`,
                  objectFit: 'cover',
                }}
              ></div>
              <div className='news_text'>
                <div className='news_source'>{val[1]}</div>
                <div>
                  트럼프가 총알을 맞을 뻔 했는데 살아서 차기 대통령 당선 확률
                  급증
                </div>
              </div>
            </div>
          );
        })}

        {/* 다른 news_box들도 동일하게 추가 */}
      </NewsCotainer>
    </RNSWrapper>
  );
};
