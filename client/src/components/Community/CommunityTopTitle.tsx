import React from 'react';
import styled from 'styled-components';

interface CommunityTopTitleProps {
  title: string;
}

const CommunityTopTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  color: ${(props) => props.theme.textColor};
  h2 {
    /* border-top: 2px solid #000; */
  }
`;

export const CommunityTopTitle = ({ title }: CommunityTopTitleProps) => {
  return (
    <CommunityTopTitleWrapper>
      <h2>{title}</h2>
    </CommunityTopTitleWrapper>
  );
};
