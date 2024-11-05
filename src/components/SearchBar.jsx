import React from 'react';
import '../css/SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="검색어를 입력해 주세요." />
    </div>
  );
};

export default SearchBar;
