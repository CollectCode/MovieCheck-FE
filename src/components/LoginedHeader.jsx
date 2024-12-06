import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Cookies from 'js-cookie';

// Header components
const LoginedHeader = ({ setCurrentPage, selectedGenre, setSelectedGenre, setIsSearched, setIsLogined, searchTerm, setSearchTerm }) => {
  const [nickname, setNickName] = useState('');
  // 로그아웃 버튼 클릭 이벤트
  const handleLogout = async() =>  {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
      console.log(cookieName);
      if (allCookies.hasOwnProperty(cookieName)) {
          Cookies.remove(cookieName); // 각 쿠키를 Delete
      }
    }
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
      setIsLogined(false);
      console.log(err.response.data.msg);
      window.location.reload();
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
          console.log(err.data);
        }
      }
    checkname();
  }, [nickname]);
  

  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={() => {setSelectedGenre("전체보기"); setCurrentPage(1);}}>
        <img src="/images/Logo1.jpg" alt="무비 체크" style={{ height: '50px', width: '100px', transform: 'scale(1.7)', marginLeft:'20px'}} />
        </Link>
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
}
export default LoginedHeader;