import { React, useState } from 'react';
import '../css/SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = () => {
      // 검색 버튼 클릭 시 처리할 로직
      alert("검색어:" + searchTerm);
  };
  return (
    <div className="search-bar">
        <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
        />  
        <button onClick={handleSearch} className="search-button">
            검색
        </button>
    </div>
  );
};

export default SearchBar;
