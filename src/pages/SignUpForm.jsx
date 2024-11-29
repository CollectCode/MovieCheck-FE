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
  const [content, setContent] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const navigate = useNavigate();

  // 회원가입 버튼클릭 이벤트
  const handleSignup = async(e) => {
      e.preventDefault();
      const requestSignupData = {
        userPassword : password,
        userPasswordConfirm : passwordConfirm,
        userName : nickname,
        userEmail : email,
        userGender : gender,
        userContent : content,
      }
      if((password.length < 8 || password.length > 17) || (passwordConfirm.length < 8 || passwordConfirm.length > 17)) {
        alert("비밀번호는 8~17자 사이로 입력해주세요.");
        return;
      } 
      if(checkEmail && checkName && password && passwordConfirm && gender) {
      try {
          if(password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
          }
          let response = await axios({
                                      method : 'post',
                                      url : '/api/users/signup',
                                      headers: {'Content-Type': 'application/json'},
                                      data : JSON.stringify(requestSignupData),
                                    });
          console.log("signup response status : " + response.status);
          console.log("signup response : " + response);
          if(response.status >= 200 && response.status < 300) {
            alert("이제부터 무비체크 회원이십니다.\n 로그인을 해주시기 바랍니다.");
          }
          if(response.status >= 400)      {
            alert("가입요청 했지만 실패.");
          }
          navigate("/login", {});
        } catch(err) {
          console.log(err);
        }
      } else {
        alert("중복확인 및 기입누락 확인해주세요.");
      }
    };
    
    // 이메일 중복체크 이벤트
    const handleCheckEmail = async (e) => {
      const requestEmailData = {
          userEmail: email,
      };
  
      // 이메일 형식 확인 정규식
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      // 이메일 형식이 올바른지 확인
      if (!emailPattern.test(email)) {
          alert("유효한 이메일 주소를 입력해주세요.");
          setCheckEmail(false);
          return;
      }
  
      let response;
      try {
          response = await axios({
              method: 'get',
              url: '/api/users/check/email',
              headers: { 'Content-Type': 'application/json' },
              params : { userEmail: email },
          });
  
          let msg = response.data.msg;
          if (response.status >= 200 && response.status < 300) {
              alert(msg);
              setCheckEmail(true);
          }
      } catch (err) {
          console.log(err.response);
          let msg = err.response.data.msg;
          if (err.response.status > 399 && err.response.status <= 500) {
              alert(msg);
              setCheckEmail(false);
          }
      }
  };

  // 닉네임 중복체크 이벤트
  const handleCheckName = async (e) => {

    // 닉네임 형식 확인 정규식 (3~15자, 한글, 알파벳, 숫자, 언더스코어만 허용)
    const namePattern = /^[가-힣a-zA-Z0-9_ ]{3,15}$/;

    // 닉네임 형식이 올바른지 확인
    if (!namePattern.test(nickname)) {
        alert("닉네임은 3~15자 길이의 한글, 알파벳, 숫자, 공백 및 언더스코어(_)만 사용할 수 있습니다.");
        setCheckName(false);
        return;
    }

    try {
        let response = await axios({
            method: 'get',
            url: '/api/users/check/name',
            headers: { 'Content-Type': 'application/json' },
            params: { userName: nickname },
        });

        if (response.status >= 200 && response.status < 300) {
            alert(response.data.msg);
            setCheckName(true);
        }
    } catch (err) {
        if (err.response.status > 399 && err.response.status <= 500) {
            alert(err.response.data.msg);
            setCheckName(false);
        }
    }
  };


  return (
    <div className="signup-container">
      <h2 className="signup-title">회 원 가 입<span className="title-notice"><br></br>&nbsp;&nbsp;*은 필수 기입항목 입니다.</span></h2>
      <form onSubmit={handleSignup}>
        <div className="signup-input-group">
            <label>*이메일 :</label>
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button" onClick={handleCheckEmail}>중복확인</button>
        </div>
        <div className="signup-input-group">
          <label>*비밀번호 : </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='password-group'>(8~20자 입력)</div>
        </div>
        <div className="signup-input-group">
          <label>*비밀번호확인 : </label>
            <input
              type="password"
              placeholder="비밀번호를 확인해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <div className='password-group'>(8~20자 입력)</div>
        </div>
        <div className="signup-input-group">
          <label>*닉네임 :</label>
          <input
            type="text"
            placeholder="사용할 닉네임을 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="button" onClick={handleCheckName}>중복확인</button>
        </div>
        <div className="signup-input-group">
          <label>한줄 소개 : </label>
            <input
              type="text"
              placeholder="본인을 소개해주세요!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
        </div>
        <div className="signup-gender-group">
          <label className='.signup-gender-group label'>*성별 :</label>
          <label>
            <input
              type="radio"
              name='gender'
              value="1"
              onChange={(e) => setGender(e.target.value)}
            /> 남
          </label>
          <label>
            <input
              type="radio"
              name='gender'
              value="2"
              onChange={(e) => setGender(e.target.value)}
            /> 여
          </label>
        </div>
        <div className="signup-btn">   
          <button type="submit">회 원 가 입</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
