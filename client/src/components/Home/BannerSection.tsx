import TypeIt from 'typeit-react';
import styled from 'styled-components';

const BannerSectionWrapper = styled.div`
  height: 150px;
  text-align: center;
  align-items: center;
  .main_banner {
    margin-top: 40px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.SignatureColor};
  }
  .sub_banner {
    font-size: 32px;
    font-weight: 500;
    padding-bottom: 20px;
    color: ${(props) => props.theme.textColor};
  }
`;

export const BannerSection = () => {
  return (
    <BannerSectionWrapper>
      <div className='main_banner'>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
            cursor: false,
          }}
        >
          영화 마니아들의 천국
        </TypeIt>
      </div>

      <div className='sub_banner'>
        <TypeIt
          options={{
            speed: 50,
            startDelay: 1500,
            waitUntilVisible: true,
            cursor: false,
          }}
        >
          최신 영화부터 뉴스, <br /> 고전 명작 영화까지 한 번에!
        </TypeIt>
      </div>
    </BannerSectionWrapper>
  );
};
