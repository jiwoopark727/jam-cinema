import React from 'react';
import styled from 'styled-components';

const PaginationBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -30px;
  margin-bottom: 20px;
  .pagination__wrapper {
    border: 1px solid #669933;
    border-radius: 50px;
    padding: 3px;
  }
  .goend {
    background: none;
    color: #669933;
    padding: 5px 13px;
    margin: 0 5px;
  }
`;

const PageBlock = styled.span`
  button {
    background: #fff;
    margin: 0 2px;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    &.on {
      background: #669933;
      color: #fff;
      border-radius: 50%;
    }
  }
`;

const Pagination = ({ currentPage, totalItems, itemsPerPage, onClick }) => {
  const pageList = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.max(1, currentPage - 5);
  const endPage = Math.min(totalPages, startPage + 9);

  for (let i = startPage; i <= endPage; i++) {
    pageList.push(i);
  }

  const prevPage = () => {
    onClick(currentPage - 1);
  };

  const nextPage = () => {
    onClick(currentPage + 1);
  };

  const goToPage = (pageNum) => {
    onClick(pageNum);
  };

  return (
    <PaginationBlock>
      <div className='pagination__wrapper'>
        <button
          onClick={prevPage}
          className='goend'
          disabled={currentPage == 1}
        >
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
        <button
          onClick={nextPage}
          className='goend'
          disabled={currentPage == pageList.length}
        >
          다음
        </button>
      </div>
    </PaginationBlock>
  );
};

export default Pagination;
