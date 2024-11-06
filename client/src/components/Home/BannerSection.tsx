import React from 'react';
import styled from 'styled-components';

const BannerSectionWrapper = styled.div`
  text-align: center;
  align-items: center;
  .main_banner {
    margin-top: 40px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 500;
    color: #1100d1;
  }
  .sub_banner {
    font-size: 32px;
    font-weight: 500;
  }
`;

export const BannerSection = () => {
  return (
    <BannerSectionWrapper>
      <div className='main_banner'>영화 마니아들의 천국</div>
      <div className='sub_banner'>
        최신 영화부터 뉴스,
        <br />
        고전 명작 영화까지 한 번에!
      </div>
    </BannerSectionWrapper>
  );
};
