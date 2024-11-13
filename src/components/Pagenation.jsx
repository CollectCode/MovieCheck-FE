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

  return (
      <div className="pagination-wrap">
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>&lt;</button>
            <span>
                {Array.from({ length: (totalItems-Math.floor((currentPage-1)/10)*pageperItems*pageperItems)/pageperItems > pageperItems ? pageperItems : totalItems / pageperItems % pageperItems }, (_, index) => (
                    <button
                        className="pageNums" 
                        key={index+1} 
                        onClick={() => setCurrentPage(index+1 + Math.floor((currentPage-1)/10)*10)} 
                        disabled={(currentPage-1)%10 === index}
                    >
                    {index+1 + Math.floor((currentPage-1)/10)*10}
                    </button>
                ))}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      </div>
  );
};

export default Pagination;
