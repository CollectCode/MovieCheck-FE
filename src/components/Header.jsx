import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>무비 체크</Link>
      </h1>
      <nav className="header-nav">
        <a href="/">마이페이지</a>
        <a href="/">로그인</a>
        <a href="/">회원가입</a>
      </nav>
    </header>
  );
};

export default Header;