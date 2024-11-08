import React from 'react';
import '../css/Profile.css'; // CSS 파일을 임포트합니다.

const MyProfile = () => {
    return (
        <div className="profile-container">
            <h1 className="profile-title">내 정보 수정</h1>
            <div className="profile-picture">
                <img src="placeholder.png" alt="프로필 사진" />
            </div>
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
                </div>
                <span className="choosedgenre">선택된 선호 장르 : </span>
            </div>
            <div className="profile-buttons">
                <button className="profile-save">저장</button>
                <button className="profile-cancel">취소</button>
            </div>
        </div>
    );
};

export default MyProfile;
