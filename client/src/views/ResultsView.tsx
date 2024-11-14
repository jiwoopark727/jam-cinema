import React from 'react';
import ResultSection from '../components/Search/ResultSection';
import styled from 'styled-components';

const ResultViewWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ResultsView = () => {
  return (
    <ResultViewWrapper>
      <ResultSection />
    </ResultViewWrapper>
  );
};

export default ResultsView;
