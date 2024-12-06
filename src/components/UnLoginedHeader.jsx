import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

// Header components
const UnLoginedHeader = ({ setCurrentPage, selectedGenre, setSelectedGenre, setIsSearched, searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={() => {setSelectedGenre("전체보기"); setCurrentPage(1);}} >
        <img src="/images/Logo1.jpg" alt="무비 체크" style={{ height: '50px', width: '100px', transform: 'scale(1.7)', marginLeft:'20px'}} />
        </Link>
      </h1>
      {
        selectedGenre === "전체보기" 
        ? <SearchBar setIsSearched={setIsSearched} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        : <></>
      }
      <nav className="header-nav">
        <Link to="/login">로그인&nbsp;&nbsp;</Link>
        <Link to="/signup">회원가입</Link>
      </nav>
    </header>
  );
};

export default UnLoginedHeader;