import React from 'react';
import '../css/Pagenation.css';

// pagenation components
const Pagination = () => {
  return (
    <div className="pagination">
      <button>&lt;&lt;</button>
      <button>&lt;</button>
      <span className="pgnum">&nbsp;&nbsp;|&nbsp;&nbsp;1&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;2&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;3&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;4&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;5&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;6&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;7&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;8&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;9&nbsp;&nbsp;|</span>
      <span className="pgnum">&nbsp;&nbsp;10&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <button>&gt;</button>
      <button>&gt;&gt;</button>
    </div>
  );
};

export default Pagination;
