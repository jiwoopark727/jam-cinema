import styled from 'styled-components';

const PaginationBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -30px;
  margin-bottom: 20px;
  .pagination__wrapper {
    border: 1px solid #4939fc;
    border-radius: 50px;
    padding: 5px;
  }
  .goend {
    background: none;
    color: ${(props) => props.theme.textColor};
    padding: 5px 13px;
    margin: 0 5px;
  }
`;

const PageBlock = styled.span`
  button {
    background: #fff;
    margin: 0 2px;
    border-radius: 50%;
    border: 1px solid #4939fc;
    width: 30px;
    height: 30px;
    line-height: 20px;
    &.on {
      background: #4939fc;
      color: #fff;
      border-radius: 50%;
    }
  }
`;

interface pageType {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  pageMove: Function;
}

const Pagination = ({ currentPage, totalItems, itemsPerPage, pageMove }: pageType) => {
  const pageList = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.max(1, currentPage - 5);
  const endPage = Math.min(totalPages, startPage + 9);

  for (let i = startPage; i <= endPage; i++) {
    pageList.push(i);
  }

  const prevPage = () => {
    pageMove(currentPage - 1);
  };

  const nextPage = () => {
    pageMove(currentPage + 1);
  };

  const goToPage = (pageNum: number) => {
    pageMove(pageNum);
  };

  return (
    <PaginationBlock>
      <div className='pagination__wrapper'>
        <button onClick={prevPage} className='goend' disabled={currentPage == 1}>
          이전
        </button>
        <PageBlock>
          {pageList.map((page) => (
            <button
              onClick={() => goToPage(page)}
              key={page}
              type='button'
              className={currentPage == page ? 'on' : ''}
            >
              {page}
            </button>
          ))}
        </PageBlock>
        <button onClick={nextPage} className='goend' disabled={currentPage == pageList.length}>
          다음
        </button>
      </div>
    </PaginationBlock>
  );
};

export default Pagination;
