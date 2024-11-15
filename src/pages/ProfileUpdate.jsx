import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ProfileUpdate.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';

const MyProfile = () => {
    const [profileImage, setProfileImage] = useState('/images/movie_poster/1125510_poster.jpg'); // 기본 프로필 이미지
    const [hovered, setHovered] = useState(false); // 마우스 오버 상태
    const [selectedButton, setSelectedButton] = useState([]);
    const genres = [
        "액션", "범죄/스릴러", "애니메이션", "코미디",
        "드라마/가족", "판타지", "공포", "전쟁", 
        "로맨스", "SF"
    ];
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [content, setContent] = useState('');
    const [checkname, setCheckname] = useState(false);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // 선택한 이미지를 상태로 업데이트
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    };

    const handleButtonClick = (newgenre) => {
        if(selectedButton.length < 3)   {
            setSelectedButton(preButton => [...preButton, newgenre]);
        }
    };

    const handleDeleteClick = (deletegenre) => {
        const newArr = selectedButton.filter(item => item !== deletegenre);
        setSelectedButton(newArr);
    };

    const handleCheckName = async(e) =>  {
        const requestNameData =  {
          userName : nickname,
        }
        try {
          let response = await axios({
                                      method : 'post',
                                      url : '/api/users/signup/name',
                                      headers : {'Content-Type' : 'application/json'},
                                      data : JSON.stringify(requestNameData)
                                    })
        setCheckname(true);
        console.log("닉네임 : " + requestNameData.userName);
        let msg = response.data.data;
        if(msg === '중복된 닉네임 입니다.') {
          setCheckname(false);
        } else {
          setCheckname(true);
        }
        alert(msg);
        } catch(err) {
          console.log(err);
        }
      }

    return (
        <div className="profile-update-container">
            <form>
                <h1 className="profile-update-title">내 정보 수정</h1>
                <div className="profile-update-picture">
                    <img className="user-image"onMouseEnter={() => setHovered(true)} // 마우스 오버 시 상태 변경
                    onMouseLeave={() => setHovered(false)} // 마우스 아웃 시 상태 변경
                    onClick={() => document.getElementById('fileInput').click()} src={profileImage} alt="프로필 사진" />
                    {hovered && <div className="overlay">프로필 추가/변경</div>}
                </div>
                <div className="profile-update-face">프로필 사진</div>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }} // 파일 입력을 숨김
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <div className="profile-update-form-group">
                    <label className="profile-update-label">변경 닉네임&nbsp;&nbsp;&nbsp;<span>※닉네임 변경은 월 1회 가능합니다.(매월 1일 초기화)</span></label>
                    <input className="profile-update-input" type="text" onChange={(e) => setNickname(e.target.value)} placeholder='닉네임을 적어주세용' />
                    <button type='button' className="profile-update-check" onClick={handleCheckName}>중복확인</button>
                </div>
                <div className="profile-update-form-group">
                    <label className="profile-update-label">비밀번호</label>
                    <input className="profile-update-input" type="password" placeholder="비밀번호 변경" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="profile-update-form-group">
                    <label className="profile-update-label">비밀번호 확인</label>
                    <input className="profile-update-input" type="password" placeholder="비밀번호 확인" onChange={(e) => setRePassword(e.target.value)}/>
                </div>
                <div className="profile-update-form-group">
                    <label className="profile-update-label">변경 할 한줄 소개</label>
                    <input className="profile-update-input" type="text" placeholder="한 줄 소개를 입력해주세요!" onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div className="profile-update-selection">
                    <h2>선호 장르 설정</h2>
                    <div className="profile-update-genres">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                className="profile-update-genre-button"
                                onClick={() => handleButtonClick(genre)}
                                type='button'
                            >{genre}</button>
                        ))}
                    </div>
                    <div className='setGenre'>
                        <div className='selectGenre'>선택된 선호 장르(최대 3개) :</div>
                        <div className="choosedgenre">
                            {selectedButton.map((btn, index) => (
                                <button key={btn} type='button' id="selected-button" style={{ marginLeft: '25px' }} onClick={() => handleDeleteClick(btn)}>
                                    {index+1}순위: {btn}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-update-buttons">
                    <Link to="/profile"><button type="submit" className="profile-update-save">저장</button></Link>
                    <Link to="/profile"><button className="profile-update-cancel">취소</button></Link>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
