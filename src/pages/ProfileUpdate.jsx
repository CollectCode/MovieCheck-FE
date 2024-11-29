import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/ProfileUpdate.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';

const ProfileUpdate = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { profilegenres = [] } = location.state || {}; // 기본값으로 빈 배열 설정
    const [defaultname, setDefaultName] = useState('');
    const [profileImage, setProfileImage] = useState('./images/user_profile/default.PNG');
    const [hovered, setHovered] = useState(false);
    const [selectedgenre, setSelectedGenre] = useState([]);
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [checkname, setCheckname] = useState(false);
    const [genres, setGenres] = useState(["액션", "범죄", "애니메이션", "코미디", "드라마", "판타지", "공포", "전쟁", "로맨스", "SF"]);
    const [comment, setComment] = useState('중복확인');
    const [imageform, setImageForm] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setImageForm(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = (newgenre) => {
        if (selectedgenre.length < 3 && !selectedgenre.includes(newgenre)) {
            setSelectedGenre((prev) => [...prev, newgenre]); // 선택된 순서를 유지
            setGenres((prev) => prev.filter((item) => item !== newgenre)); // 선택된 장르를 제거
        }
    };
    
    
    const handleDeleteClick = (deletegenre) => {
        setSelectedGenre((prev) => prev.filter((item) => item !== deletegenre)); // 선택된 장르에서 삭제
        setGenres((prev) => [...prev, deletegenre]); // 삭제된 장르를 다시 추가
    };
    
    
    const handleCheckName = async (e) => {
        if (nickname !== defaultname) {
            const requestNameData = { userName: nickname };
            try {
                let response = await axios({
                    method: 'post',
                    url: '/api/users/check/name',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(requestNameData)
                });
                setCheckname(true);
                let msg = response.data.msg;
                if (response.status === 409) {
                    alert(msg);
                    setCheckname(false);
                } else {
                    setComment('확인완료');
                    setCheckname(true);
                }
                alert(msg);
            } catch (err) {
                console.log(err);
            }
        } else {
            setComment('확인완료');
            setCheckname(true);
            alert("사용가능한 닉네임 입니다.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(selectedgenre);
        if (checkname) {
            const formData = new FormData();
            formData.append('userImage', imageform);
            const genreDto = selectedgenre.map(item => ({ genreName: item }));
            const userDto = { userName: nickname, userContent: content };
            try {
                await axios({
                    method: 'put',
                    url: '/api/user-genre/genres',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(genreDto),
                    withCredentials: true,
                });
            } catch (err2) {
                console.log(err2);
            }

            try {
                await axios({
                    method: 'put',
                    url: '/api/users/update',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(userDto),
                    withCredentials: true,
                });
            } catch (err) {
                let msg = err.response.data.msg;
                console.log(err);
                alert(msg);
            }

            try {
                await axios({
                    method: 'post',
                    url: '/api/users/uploadimage',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData,
                    withCredentials: true,
                });
            } catch (err3) {
                console.log(err3);
            }
        } else {
            alert("중복확인 및 기입누락 확인해주세요.");
            return;
        }
        alert("변경이 완료되었습니다!");
        navigate("/", {});
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const getuser = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: '/api/users/mypage',
                    withCredentials: true,
                });
                let user = response.data;
                if (user.data.userProfile) {
                    setProfileImage(user.data.userProfile);
                }
                setDefaultName(user.data.userName);
                setNickname(user.data.userName);
                setContent(user.data.userContent);
                setSelectedGenre(profilegenres.map(genre => genre.genreName));
            } catch (err) {
                console.log(err);
            } finally   {
                setIsLoading(false);
                console.log(profilegenres);
            }
        }
        getuser();
    }, []);

    useEffect(() => {
        if (checkname) {
            setCheckname(false);
            setComment('중복확인');
        }
    }, [nickname]);

    useEffect(() => {
        setGenres((prevGenres) =>
            ["액션", "범죄", "애니메이션", "코미디", "드라마", "판타지", "공포", "전쟁", "로맨스", "SF"].filter(
                (genre) => !selectedgenre.includes(genre)
            )
        );
    }, [selectedgenre]);

    return (
        <div className="profile-update-container">
            {isLoading
            ? (
            <div className="loading-content">
                <div className="loader"></div> {/* 로딩 애니메이션 */}
                <p>로딩중...</p>
            </div>
            ) : (
            <form>
                <h1 className="profile-update-title">내 정보 수정</h1>
                <div className="profile-update-picture">
                    <img className="user-image"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => document.getElementById('fileInput').click()}
                        src={profileImage} alt="프로필 사진" />
                    {hovered && <div className="overlay">프로필 변경</div>}
                </div>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }} // 파일 입력을 숨김
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <div className="profile-update-form-group">
                    <label className="profile-update-label">변경 닉네임</label>
                    <input className="profile-update-input" type="text" onChange={(e) => setNickname(e.target.value)} defaultValue={nickname} />
                    <button type='button' className="profile-update-check" onClick={handleCheckName} disabled={checkname}>{comment}</button>
                </div>
                <div className="profile-update-form-group">
                    <label className="profile-update-label">변경 할 한줄 소개</label>
                    <input className="profile-update-input" type="text" defaultValue={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="profile-update-selection">
                    <h2 className="selection-title">선호 장르 설정</h2>
                    <div className="profile-update-genres">
                        {
                        genres.map((genre) => (
                            !selectedgenre.includes(genre) ?
                            <button
                                key={genre}
                                className="profile-update-genre-button"
                                onClick={() => handleButtonClick(genre)}
                                type='button'
                            >{genre}</button> : <></>
                        ))}
                    </div>
                    <div className='setGenre'>
                        <div className='selectGenre'>선택된 선호 장르(최대 3개) :</div>
                        <div className="choosedgenre">
                            {selectedgenre.map((btn, index) => (
                                <button key={btn} type='button' id="selected-button" style={{ marginLeft: '25px' }} onClick={() => handleDeleteClick(btn)}>
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-update-buttons">
                    <button type="submit" className="profile-update-save" onClick={handleUpdate}>저장</button>
                    <Link to="/profile"><button className="profile-update-cancel">취소</button></Link>
                </div>
            </form>
            )}
        </div>
    );
};

export default ProfileUpdate;
