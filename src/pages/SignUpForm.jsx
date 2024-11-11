import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css'; 
import axios from 'axios';

// signup page
const SignupForm = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSignup = async(e) => {
      e.preventDefault();
      const requestSignupData = {
        userPassword : password,
        userPasswordConfirm : passwordConfirm,
        userName : nickname,
        userEmail : email,
        userGender : gender,
      }
      try {
        let response = await axios({
                                    method : 'post',
                                    url : '/api/users/login',
                                    headers: {'Content-Type': 'application/json'},
                                    data : JSON.stringify(requestSignupData),
                                   });
        console.log("signup response status : " + response.status);
        console.log("signup response : " + response);
        if(response.status >= 200 && response.status < 300) {
          alert("로그인 요청 및 로그인 성공.");
        }
        if(response.status >= 400)      {
          alert("로그인 요청했지만 실패.");
        }
        navigate("/", {});
      } catch(err) {
        console.log(err);
      }
    };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회 원 가 입</h2>
      <form onSubmit={handleSignup}>
        <div className="signup-input-group">
            <label>이메일 :</label>
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button">인증하기</button>
        </div>
        <div className="signup-input-group">
          <label>비밀번호 : </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-input-group">
          <label>비밀번호확인 : </label>
            <input
              type="password"
              placeholder="비밀번호를 확인해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
        </div>
        <div className="signup-input-group">
          <label>닉네임 :</label>
          <input
            type="text"
            placeholder="사용할 닉네임을 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="button">중복확인</button>
        </div>
        <div className="signup-gender-group">
          <label>성별 :</label>
          <label>
            <input
              type="radio"
              value="0"
              checked={gender === '0'}
              onChange={(e) => setGender(e.target.value)}
            /> 남
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={gender === '1'}
              onChange={(e) => setGender(e.target.value)}
            /> 여
          </label>
        </div>  
        <button type="submit">회 원 가 입</button>
      </form>
    </div>
  );
};

export default SignupForm;
