import React, { useState } from 'react';
import '../css/SignUpForm.css'; // CSS 파일을 따로 만들어 스타일링을 적용할 수 있습니다.

const SignupForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [gender, setGender] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // 회원가입 로직을 여기에 추가하세요.
    console.log('가입 정보:', { id, password, nickname, email, gender, agree });
  };

  return (
    <div className="signup-container">
      <h2>회 원 가 입</h2>
      <form onSubmit={handleSignup}>
        <div className="signup-input-group">
            <label>이메일 :</label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button">인증</button>
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
            placeholder="사용하실 닉네임을 입력해 주세요"
            required
          />
          <button type="button">중복확인</button>
        </div>
        <div className="signup-gender-group">
          <label>성별 :</label>
          <label>
            <input
              type="radio"
              value="남자"
              checked={gender === '남자'}
              onChange={(e) => setGender(e.target.value)}
            /> 남자
          </label>
          <label>
            <input
              type="radio"
              value="여자"
              checked={gender === '여자'}
              onChange={(e) => setGender(e.target.value)}
            /> 여자
          </label>
        </div>  
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
