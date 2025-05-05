import styled from 'styled-components';

interface ITitle {
  title: string;
}

const NoResultWrapper = styled.div`
  height: calc(100% - 73px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -70px;
  h3 {
    font-size: 36px;
    margin-bottom: 120px;
    span {
      color: #3863ff;
    }
  }
`;

const NoResult = ({ title }: ITitle) => {
  return (
    <NoResultWrapper>
      <h3>
        '<span>{title}</span>' 관련된 영화가 없습니다.
      </h3>
      <img src='/images/no_result.png' alt='' />
    </NoResultWrapper>
  );
};

export default NoResult;
