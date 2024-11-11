import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ProfileUpdate.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';

const MyProfile = () => {
    const [profileImage, setProfileImage] = useState('/images/movie_poster/1125510_poster.jpg'); // 기본 프로필 이미지
    const [hovered, setHovered] = useState(false); // 마우스 오버 상태
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const genres = [
        "액션", "범죄/스릴러", "애니메이션", "코미디",
        "드라마/가족", "판타지", "공포", "전쟁", 
        "로맨스", "SF"
    ];
    
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

    const handleButtonClick = (genre) => {
        setSelectedGenre(genre);
        setSelectedButton(genre); // 선택된 버튼의 장르 저장
    };

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
                    <label className=".profile-update-update-label">변경 닉네임&nbsp;&nbsp;&nbsp;<span>※닉네임 변경은 월 1회 가능합니다.(매월 1일 초기화)</span></label>
                    <input className="profile-update-input" type="text" placeholder="변경 닉네임" />
                    <button type='button' className="profile-update-check">중복확인</button>
                </div>
                <div className="profile-update-form-group">
                    <label className=".profile-update-update-label">비밀번호</label>
                    <input className="profile-update-input" type="password" placeholder="비밀번호 변경" />
                </div>
                <div className="profile-update-form-group">
                    <label className=".profile-update-label">비밀번호 확인</label>
                    <input className="profile-update-input" type="password" placeholder="비밀번호 확인" />
                </div>
                <div className="profile-update-form-group">
                    <label className=".profile-update-label">변경 할 한줄 소개</label>
                    <input className="profile-update-input" type="text" defaultValue="기존 한줄 소개" /> {/* 기존 사용자가 가지고 있던 한줄소개 넣기 */}
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
                        <div className="choosedgenre">
                            선택된 선호 장르 : {selectedButton && (
                                <button type='button' id="selected-button" style={{ marginLeft: '25px' }}>
                                    {selectedButton}
                                </button>
                            )}
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
