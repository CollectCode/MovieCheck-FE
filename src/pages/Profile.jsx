import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Profile.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';


const Profile = () => {
    const [profileimage, setProfileImage] = useState('./images/user_profile/default.PNG');
    const [profilename, setProfileName] = useState('');
    const [profilegrade, setProfileGrade] = useState('');
    const [profilecontent, setProfileContent] = useState('');
    const [profilegenre, setProfileGenre] = useState('');

    useEffect(() => {
        const getuser = async() => {
            try {
                const response = await axios({
                                        method:'get',
                                        url: '/api/users/mypage',
                                        withCredentials : true,
            });
            let user = response.data;
            console.log(user);
            setProfileName(user.data.userName);
            setProfileGrade(user.data.userGrade);
            setProfileContent(user.data.userContent);
            setProfileGenre(user.data.userGenre);
            } catch(err)  {
                console.log(err);
            }
        }
        getuser();
      }, []);

    return (
        <div className="profile-container">
            <form action="">
                <h1 className="profile-title">내 정보</h1>
                <div className="profile-picture">
                    <img className="user-image" src={profileimage} alt="프로필 사진" />
                </div>
                <div className="profile-face">프로필 사진</div>
                <div className="profile-form-group">
                    <label className="profile-label">닉네임</label>
                    <div className="user-value">{profilename}</div>
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">등급</label>
                    <div className="user-value">{profilegrade}</div>
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">한줄 소개</label>
                    <div className="user-value">{profilecontent}</div>
                </div>
                <div className="profile-selection">
                    <h2>선호 장르</h2>
                    <div className="profile-genres">
                        <button type="button" className="profile-genre-button" value={profilegenre}></button>
                    </div>
                </div>
                <div className="profile-buttons">
                    <Link to="/profileupdate" content={profilecontent}><button className="profile-save">정보 수정</button></Link>
                    <Link to="/"><button className="profile-save">취소</button></Link>
                </div>
            </form>
        </div>
    );
};

export default Profile;
