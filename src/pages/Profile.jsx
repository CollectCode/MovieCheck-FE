import React, { useState } from 'react';
import '../css/Profile.css'; // CSS 파일을 임포트합니다.

const MyProfile = () => {
    const [profileImage, setProfileImage] = useState('/images/movie_poster/1125510_poster.jpg'); // 기본 프로필 이미지
    const [hovered, setHovered] = useState(false); // 마우스 오버 상태

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

    return (
        <div className="profile-container">
            <form action="">
                <h1 className="profile-title">내 정보 수정</h1>
                <div className="profile-picture">
                    <img className="user-image"onMouseEnter={() => setHovered(true)} // 마우스 오버 시 상태 변경
                    onMouseLeave={() => setHovered(false)} // 마우스 아웃 시 상태 변경
                    onClick={() => document.getElementById('fileInput').click()} src={profileImage} alt="프로필 사진" />
                    {hovered && <div className="overlay">프로필 추가/변경</div>}
                </div>
                <div className="profile-face">프로필 사진</div>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }} // 파일 입력을 숨김
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <div className="profile-form-group">
                    <label className="profile-label">변경 닉네임&nbsp;&nbsp;&nbsp;<span>※닉네임 변경은 월 1회 가능합니다.(매월 1일 초기화)</span></label>
                    <input className="profile-input" type="text" placeholder="변경 닉네임" />
                    <button className="profile-check">중복확인</button>
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">비밀번호</label>
                    <input className="profile-input" type="password" placeholder="비밀번호 변경" />
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">비밀번호 확인</label>
                    <input className="profile-input" type="password" placeholder="비밀번호 확인" />
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">변경 할 한줄 소개</label>
                    <input className="profile-input" type="text" defaultValue="기존 한줄 소개" /> {/* 기존 사용자가 가지고 있던 한줄소개 넣기 */}
                </div>
                <div className="profile-selection">
                    <h2>선호 장르 설정</h2>
                    <div className="profile-genres">
                        <button className="profile-genre-button" id='action'>액션</button>
                        <button className="profile-genre-button" id='thriller'>범죄/스릴러</button>
                        <button className="profile-genre-button" id='animation'>애니메이션</button>
                        <button className="profile-genre-button" id='comedy'>코미디</button>
                        <button className="profile-genre-button" id='drama'>드라마/가족</button>
                        <button className="profile-genre-button" id='fantacy'>판타지</button>
                        <button className="profile-genre-button" id='horror'>공포</button>
                        <button className="profile-genre-button" id='war'>전쟁</button>
                        <button className="profile-genre-button" id='romance'>로맨스</button>
                        <button className="profile-genre-button" id='sf'>SF</button>
                        <div className="choosedgenre">선택된 선호 장르 : </div>
                    </div>
                </div>
                <div className="profile-buttons">
                    <button className="profile-save">저장</button>
                    <button className="profile-cancel">취소</button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
