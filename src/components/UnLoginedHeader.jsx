import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

// Header components
const UnLoginedHeader = (userName) => {
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>무비 체크</Link>
      </h1>
      <SearchBar />
      <nav className="header-nav">
        <Link to="/login">로그인&nbsp;&nbsp;</Link>
        <Link to="/signup">회원가입</Link>
      </nav>
    </header>
  );
};

export default UnLoginedHeader;