import styled from 'styled-components';

interface CommunityTopTitleProps {
  title: string;
}

const CommunityTopTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  color: ${(props) => props.theme.textColor};
`;

export const CommunityTopTitle = ({ title }: CommunityTopTitleProps) => {
  return (
    <CommunityTopTitleWrapper>
      <h2>{title}</h2>
    </CommunityTopTitleWrapper>
  );
};
