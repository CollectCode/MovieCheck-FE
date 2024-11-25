import { React, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/SearchBar.css';

// SearchBar components
const SearchBar = ({ setIsSearched, setMovies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = () => {
      // 검색 버튼 클릭 시 처리할 로직
      alert("검색어:" + searchTerm);
      console.log("asdf");
  };

  useEffect(() => {
    const searchResult = async() => {
      if(!searchTerm)  {
        setIsSearched(false);
      } else {
        try {
          const response = await axios({
            method: 'get',
            url: '/api/movies/search',
            params: { page : 0,
                      size: 1000,
                      keyword : searchTerm
                    }
          });
          console.log(response.data.totalPages);
          setMovies(response.data.movies);
          setIsSearched(true);
        } catch(err)  {
          console.log(err);
        }
      }
    }
   searchResult();
  }, [searchTerm]);

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
