import { React, useEffect } from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ setIsSearched, searchTerm, setSearchTerm }) => {

  useEffect(() => {
    const searchResult = async () => {
      if (searchTerm) { // 검색어가 있을 때만 실행
        // 예제: API 호출을 통해 검색 결과를 가져오는 코드
        try {
          setIsSearched(true);
        } catch (error) {
          console.error("검색 중 오류 발생:", error);
        }
      } else {
        setIsSearched(false); // 검색어가 없을 경우
      }
    };
    searchResult();
  }, [searchTerm, setIsSearched]);

  return (
    <div className="search-bar">
      <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input" 
      />
    </div>
  );
};

export default SearchBar;
