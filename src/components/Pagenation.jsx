import React, { useState } from 'react';
import '../css/Pagenation.css';

// pagenation components
const Pagination = ({ totalItems , pageperItems}) => {
  const totalPages = Math.ceil(totalItems / pageperItems);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  return (
      <div className="pagination-wrap">
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>&lt;</button>
            <span>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        className="pageNums" 
                        key={index + 1} 
                        onClick={() => handlePageClick(index + 1)} 
                        disabled={currentPage === index + 1}
                    >
                      {index + 1}
                    </button>
                ))}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      </div>
  );
};

export default Pagination;
