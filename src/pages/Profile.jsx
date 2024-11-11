import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Profile.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';


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
                <h1 className="profile-title">내 정보</h1>
                <div className="profile-picture">
                    <img className="user-image" src={profileImage} alt="프로필 사진" />
                </div>
                <div className="profile-face">프로필 사진</div>
                <div className="profile-form-group">
                    <label className="profile-label">닉네임</label>
                    <input className="profile-input" type="text" placeholder="사용자의 닉네임" readOnly/>
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">등급</label>
                    <input className="profile-input" type="text" placeholder="사용자의 등급" readOnly/>
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">한줄 소개</label>
                    <input className="profile-input" type="text" placeholder="사용자의 한줄 소개" readOnly/>
                </div>
                <div className="profile-selection">
                    <h2>선호 장르</h2>
                    <div className="profile-genres">
                        <button type="button" className="profile-genre-button" id='action'>액션</button>
                    </div>
                </div>
                <div className="profile-buttons">
                    <Link to="/profileupdate"><button className="profile-save">내 정보 수정</button></Link>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
