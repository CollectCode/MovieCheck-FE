import React from 'react';
import '../css/Pagenation.css';

// Pagination component
const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMove = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  // 페이지 버튼 생성
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1; // 현재 페이지 그룹의 시작 페이지
    const endPage = Math.min(startPage + 9, totalPages); // 현재 페이지 그룹의 끝 페이지

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button 
          key={i} 
          className='pageNums' 
          onClick={() => handleMove(i)} 
          disabled={currentPage === i} // 현재 페이지는 비활성화
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-wrap">
      <div className="pagination">
        <button 
          className="pre-next-button" 
          onClick={handlePrev} 
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button 
          className="pre-next-button" 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
