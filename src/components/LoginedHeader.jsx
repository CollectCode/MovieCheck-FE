import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

// Header components
const LoginedHeader = ({setIsLogined}, nickName) => {

  // 로그아웃 버튼 클릭 이벤트
  const handleLogout = async() =>  {
    try {
      const response = await axios ({
                                      method: 'post',
                                      url:'/api/users/logout',
                                      headers: { 'Contents-Type' : 'application/JSON'},
                                      withCredentials : true,
                                    });
      setIsLogined(false);
      let msg = response.data.msg;
      alert(msg);
    } catch(err)  {
      console.log(err.response.data.msg);
    }
  }
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>무비 체크</Link>
      </h1>
      <SearchBar />
      <nav className="header-nav">
        <Link to="/profile">마이페이지&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/" onClick={handleLogout}>로그아웃</Link>
      </nav>
    </header>
  );
};

export default LoginedHeader;