import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginForm.css';

// LoginForm page
const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const resetInput = () => {
      setId("");
      setPassword("");
      document.getElementsByClassName("input-info").value = "";
  }
  const handleLoginClick = async (e) => {
    e.preventDefault();
    // 로그인 로직을 여기에 추가
    const requestLoginData = {userEmail : id, userPassword : password};
    console.log("requestLoginData : " + requestLoginData.userEmail + " " + requestLoginData.userPassword);
    try {
        let response = await axios({
                                    method : 'post',
                                    url : '/api/users/login',
                                    headers: {'Content-Type': 'application/json'},
                                    data : JSON.stringify(requestLoginData),
                                    });
        console.log("Login response status : " + response.status);
        console.log("Login response : " + response);
        if(response.status >= 200 && response.status < 300) {
          alert("로그인 요청 및 로그인 성공.");
        }
        if(response.status >= 400)      {
          alert("로그인 요청했지만 실패.");
        }
        navigate("/", {});
      } catch(err) {
        console.log(err);
        resetInput();
      }
    };

  return (
    <div className="login-container">
      <div className="logintitle">로그인</div>
      <form className="login-forms" onSubmit={handleLoginClick}>
        <div className="login-input-group">
          <label className="logininfo">ID</label>
          <input
            className="input-info"
            type="text"
            placeholder="ID 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label className="logininfo">PASSWORD</label>
          <input
            type="password"
            className="input-info"
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
