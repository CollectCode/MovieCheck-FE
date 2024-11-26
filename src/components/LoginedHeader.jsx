import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Cookies from 'js-cookie';

// Header components
const LoginedHeader = ({ selectedGenre, setSelectedGenre, setIsSearched, setIsLogined, searchTerm, setSearchTerm }) => {
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
      // 모든 쿠키의 이름을 Get
      const allCookies = Cookies.get();
      for (const cookieName in allCookies) {
          if (allCookies.hasOwnProperty(cookieName)) {
              Cookies.remove(cookieName); // 각 쿠키를 Delete
          }
      }
    } catch(err)  {
      console.log(err.response.data.msg);
    }
  }

  // 닉네임 중복확인
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
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={() => setSelectedGenre("전체보기")}>무비 체크</Link>
      </h1>
      {
        selectedGenre === "전체보기" 
        ? <SearchBar setIsSearched={setIsSearched} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        : <></>
      }
      <nav className="header-nav">
        <Link to="/profile" setIsLogined={setIsLogined}>{nickname}님 환영합니다.&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/" onClick={handleLogout}>로그아웃</Link>
      </nav>
    </header>
  );
};

export default LoginedHeader;