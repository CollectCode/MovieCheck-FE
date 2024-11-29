import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Profile.css'; 
import axios from 'axios';

const Profile = ({ setIsLogined }) => {
    const [profileimage, setProfileImage] = useState('./images/user_profile/default.PNG');
    const [profilename, setProfileName] = useState('');
    const [profilegrade, setProfileGrade] = useState('');
    const [profilecontent, setProfileContent] = useState('');
    const [profilegenre, setProfileGenre] = useState([]);
    const [profilelike, setProfileLike] = useState('0');
    const [isLoading, setIsLoading] = useState();
    let navigate = useNavigate();

    const deleteuser = useCallback(async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');
        if (confirmDelete) {
            const confirmDelete2 = window.confirm('지우면 영원히 되돌릴 수 없습니다. \n정말 탈퇴하시겠습니까?');
            if (confirmDelete2) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: '/api/users/delete',
                        withCredentials: true,
                    });
                    if (response.status >= 200 && response.status < 300) {
                        alert(response.data.msg);
                        setIsLogined(false);
                        navigate('/', {});
                    }
                } catch (err) {
                    console.error('Error during deletion:', err.response ? err.response.data : err.message);
                }
            }
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const getuser = async () => {
            try {
                const userResponse = await axios.get('/api/users/mypage', { withCredentials: true });
                const user = userResponse.data;
                setProfileName(user.data.userName);
                setProfileContent(user.data.userContent);
                setProfileGrade(user.data.userGrade);
                if (user.data.userGood) setProfileLike(user.data.userGood);
                if (user.data.userProfile) setProfileImage(user.data.userProfile);
            } catch (err) {
                console.error(err);
            }
        };
        const getUserGenres = async () =>   {
            try {
                const genreResponse = await axios.get('/api/user-genre/genres', { withCredentials: true });
                setProfileGenre(genreResponse.data.data);
            } catch (err) {
                console.error(err);
            } finally   {
                setIsLoading(false);
            }
        }
        getuser();
        getUserGenres();
    }, []);

    return (
        <div className="profile-container">
            {isLoading ?
            (
            <div className="loading-content">
                <div className="loader"></div> {/* 로딩 애니메이션 */}
                <p>로딩중...</p>
            </div>
            ) : (
            <div className="profile-card">
                <div className="top-title">
                    <h1 className="profile-title">내 정보</h1>
                    <button className="profile-delete" onClick={deleteuser}>
                        탈퇴하기
                    </button>
                </div>
                <div className="profile-picture">
                    <img className="user-image" src={profileimage} alt="프로필 사진" />
                </div>
                <div className="profile-content">
                    <div className="profile-section">
                        <label className="profile-label">닉네임</label>
                        <div className="user-value">{profilename}</div>
                    </div>
                    <div className="profile-section">
                        <label className="profile-label">등급</label>
                        <div className="user-value">{profilegrade}</div>
                    </div>
                    <div className="profile-section">
                        <label className="profile-label">좋아요</label>
                        <div className="user-value">{profilelike}</div>
                    </div>
                </div>
                <div className="profile-introduction">
                    <label className="profile-label">한줄 소개</label>
                    <div className="user-value">{profilecontent}</div>
                </div>
                <div className="profile-selection">
                    <div className="selection-title">선호 장르</div>
                    <div className="like-buttons">
                        {profilegenre.length > 0 ? (
                            profilegenre.map((genre, index) => (
                                <button key={genre.genreKey || index} className="profile-genre-button">
                                    {genre.genreName}
                                </button>
                            ))
                        ) : (
                            <button className="profile-genre-button">선호 장르가 없습니다.</button>
                        )}
                    </div>
                </div>
                    <div className="profile-buttons">
                        <Link
                            to="/profileupdate"
                            state={{ profilegenres: profilegenre }}
                        >
                            <button className="profile-save">정보 수정</button>
                        </Link>
                    <Link to="/">
                        <button className="profile-save">취소</button>
                    </Link>
                </div>
            </div>
           )}
        </div>
    );
};

export default Profile;
