import { useNavigate } from 'react-router';
import styled from 'styled-components';

const FooterWrapper = styled.div``;

const FooterContainer = styled.div`
  background-color: #282c34;
  color: white;
  margin-top: 100px;
  padding: 20px 40px;
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  text-align: center;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
  }

  p {
    color: #61dafb;
  }

  a {
    color: #61dafb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  a {
    color: white;
    font-size: 1.5rem;
    text-decoration: none;

    &:hover {
      color: #61dafb;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  font-size: 0.9rem;
`;

export const Footer = () => {
  // const handleScrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };
  const navigate = useNavigate();
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterTop>
          <FooterColumn>
            <h4>제작자</h4>
            <ul>
              <li>
                <p>박지우</p>
              </li>
              <li>
                <p>김광명</p>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h4>바로 가기</h4>
            <ul>
              <li>
                <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                  홈
                </a>
              </li>
              <li>
                <a href='/community'>커뮤니티</a>
              </li>
              <li>
                <a href='/미정'>장르별 영화</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h4>Connect With Us</h4>
            <SocialLinks>
              <a
                href='https://github.com/jiwoopark727/jam-cinema'
                target='_blank'
                rel='github'
              >
                <img src='/images/footer/github.png' alt='GitHub Logo' />
              </a>
              <a
                href='https://www.instagram.com/iamburgerlover'
                target='_blank'
                rel='instagram'
              >
                <img src='/images/footer/instagram.png' alt='GitHub Logo' />
              </a>
            </SocialLinks>
          </FooterColumn>
        </FooterTop>
        <FooterBottom>
          © {new Date().getFullYear()} Jam Cinema. All Rights Reserved.
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};
