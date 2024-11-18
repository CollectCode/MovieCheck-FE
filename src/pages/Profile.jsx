import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Profile.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';


const Profile = () => {
    const [profileimage, setProfileImage] = useState('./images/user_profile/default.PNG');
    const [profilename, setProfileName] = useState('');
    const [profilegrade, setProfileGrade] = useState('');
    const [profilecontent, setProfileContent] = useState('');
    const [profilegenre, setProfileGenre] = useState([]);
    const [profilelike, setProfileLike] = useState('');
    const [profiledislike, setProfileDisLike] = useState('');

    // 첫 마운트시 유저 정보 Get

    useEffect(() => {
        const getuser = async() => {
            try {
                const response = await axios({
                                               method:'get',
                                               url: '/api/user-genre/genres',
                                               withCredentials : true,

                });
                console.log(response.data.data);
                response.data.data.map((genre) => {
                    setProfileGenre(preButton => [...preButton, genre]);
                });
            } catch(err)    {
                console.log(err);
            }

            try {
                const response = await axios({
                                        method:'get',
                                        url: '/api/users/mypage',
                                        withCredentials : true,
                });
                let user = response.data;
                console.log(user);
                console.log(user.data.userProfile);
                setProfileName(user.data.userName);
                setProfileGrade(user.data.userGrade);
                setProfileLike(user.data.userGood);
                setProfileDisLike(user.data.userBad);
                if(user.data.userContent !== null) { setProfileContent(user.data.userContent); }
                if(user.data.userProfile !== null) { setProfileImage(user.data.userProfile); }
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
                <div className="profile-form-group">
                    <label className="profile-label">좋아요</label>
                    <div className="user-value">{profilelike}</div>
                </div>
                <div className="profile-form-group">
                    <label className="profile-label">싫어요</label>
                    <div className="user-value">{profiledislike}</div>
                </div>
                <div className="profile-selection">
                    <h2>선호 장르</h2>
                    <div className="like-buttons">
                        {profilegenre.length > 0 ? profilegenre.map((genre, index) => (
                            <button 
                                key={genre.genreKey || index} // genreKey가 null일 경우 index 사용
                                type="button" 
                                className="profile-genre-button" 
                                style={{ fontSize: '20px', backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#007BFF' : index === 2 ? '#6F42C1' : 'initial' }}
                                id={index}
                            >
                                {index + 1} 순위 : {genre.genreName} {/* genreName에 접근 */}
                            </button>
                        )) : <button className='profile-nogenre-button' style={{ fontSize: '20px' }}>선호 장르가 없습니다. 골라주세요!</button>}
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
