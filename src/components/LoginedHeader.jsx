import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

// Header components
const LoginedHeader = ({setIsLogined}) => {
  const [nickname, setNickName] = useState('');
  // 로그아웃 버튼 클릭 이벤트
  const handleLogout = async() =>  {
    try {
      const response = await axios ({
                                      method: 'post',
                                      url:'/api/users/logout',
                                      headers: { 'Contents-Type' : 'application/json'},
                                      withCredentials : true,
                                    });
      setIsLogined(false);
      let msg = response.data.msg;
      alert(msg);
    } catch(err)  {
      console.log(err.response.data.msg);
    }
  }

  useEffect(() => {
    const checkname = async(e) => {
        try {
          let response = await axios({
                                      method : 'get',
                                      url: '/api/users/mypage',
                                      headers: { 'Contents-Type' : 'application/json'},
                                      withCredentials : true,
          });
          setNickName(response.data.data.userName);
        } catch(err)  {
          console.log(err);
        }
      }
    checkname();
  }, [nickname]);
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>무비 체크</Link>
      </h1>
      <SearchBar />
      <nav className="header-nav">
        <Link to="/profile">{nickname}님 환영합니다.&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/" onClick={handleLogout}>로그아웃</Link>
      </nav>
    </header>
  );
};

export default LoginedHeader;