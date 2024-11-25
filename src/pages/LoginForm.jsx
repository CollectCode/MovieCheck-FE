import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginForm.css';

// LoginForm page
const LoginForm = ({setIsLogined}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  
  // 리셋 버튼
  const resetInput = () => {
      setId("");
      setPassword("");
      document.getElementsByClassName("input-info-id").value = "";
      document.getElementsByClassName("input-info-password").value = "";
  }

  // 비밀번호만 초기화
  const resetPassword = () => {
    setPassword("");
    document.getElementsByClassName("input-info-password").value = "";
  }

  // 로그인 버튼 클릭 이벤트
  const handleLoginClick = async (e) => {
    e.preventDefault();
    const requestLoginData = {userEmail : id, userPassword : password};
    let msg = "";
    let response;
    console.log("requestLoginData : " + requestLoginData.userEmail + " " + requestLoginData.userPassword);
    try {
        response = await axios({
                                  method : 'post',
                                  url : '/api/users/login',
                                  headers: {'Content-Type': 'application/json'},
                                  data : JSON.stringify(requestLoginData),
                                });
        msg = response.data.msg;
        if(response.status >= 200 && response.status < 300) {
          alert(msg);
          setIsLogined(true);
          navigate("/", {});
        }
      } catch(err) {
        msg = err.response.data.msg;
        if(err.response.status > 399 && err.response.status < 500) {
          alert(msg);
          if(err.response.status === 404) {
            resetInput();
          } else if(err.response.status === 401)  {
            resetPassword();
          }
        }
      }
    };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="login-container">
      <div className="logintitle">로그인</div>
      <form className="login-forms" onSubmit={handleLoginClick}>
        <div className="login-input-group">
          <label className="logininfo">ID(이메일)</label>
          <input
            className="input-info-id"
            type="text"
            placeholder="ID 입력(이메일)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label className="logininfo">PASSWORD</label>
          <input
            type="password"
            className="input-info-password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button className="loginbtn" type="submit">로그인</button>
          <Link className="signupbtn" to="/signup">회원가입&nbsp;&nbsp;&nbsp;</Link>
          <div className="findidbtn">아이디 찾기&nbsp;&nbsp;&nbsp;</div>
          <div className="findpwbtn">비밀번호 찾기</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
