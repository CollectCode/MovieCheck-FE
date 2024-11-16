import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ProfileUpdate.css'; // CSS 파일을 임포트합니다.
import axios from 'axios';

const MyProfile = () => {
    const [defaultname, setDefaultName] = useState('');
    const [profileImage, setProfileImage] = useState('./images/user_profile/default.PNG'); // 기본 프로필 이미지
    const [hovered, setHovered] = useState(false);
    const [selectedgenre, setSelectedGenre] = useState([]);
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [content, setContent] = useState('');
    const [checkname, setCheckname] = useState(false);
    const [genres, setGenres] = useState(["액션", "범죄", "애니메이션", "코미디", "드라마/가족", "판타지", "공포", "전쟁", "로맨스", "SF"]);
    const [comment, setComment] = useState('중복확인');

    //프로필 이미지 교체
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader(); // Filereader 로드
            reader.onloadend = () => {
                setProfileImage(reader.result); // 선택한 이미지를 상태로 업데이트
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    };

    // 선호장르 추가이벤트
    const handleButtonClick = (newgenre) => {
        if(selectedgenre.length < 3)   {
            const newarr = genres.filter(item => item !== newgenre);
            setGenres(newarr);
            setSelectedGenre(preButton => [...preButton, newgenre]);
        }
    };

    // 선호장르 제거이벤트
    const handleDeleteClick = (deletegenre) => {
        const newarr = selectedgenre.filter(item => item !== deletegenre);
        setSelectedGenre(newarr);
        setGenres(preButton => [...preButton, deletegenre]);
    };

    // 닉네임 중복체크
    const handleCheckName = async(e) =>  {
        if(nickname !== defaultname)    {
            const requestNameData =  {
            userName : nickname,
            }
            try {
            let response = await axios({
                                        method : 'post',
                                        url : '/api/users/signup/name',
                                        headers : {'Content-Type' : 'application/json'},
                                        data : JSON.stringify(requestNameData)
                                        });
            setCheckname(true);
            let msg = response.data.msg;
            if(response.status === 409) {
                alert(msg);
                setCheckname(false);
            } else {
                setComment('확인완료');
                setCheckname(true);
            }
            alert(msg);
            } catch(err) {
                console.log(err);
            }
        } else  {
            alert("Exist nickname");
        }
    }

    // 내 정보 수정 요청
    const handleUpdate = async(e) =>    {
        const userDto = { userName : nickname ,
                          userContent : content
        };
        const genredata = selectedgenre.map(item => ({
            genreName: item
        }));
        let msg;
        try {
            let response = await axios({
                                        method:'put',
                                        url:'/api/users/update',
                                        headers: { 'Content-Type' : 'application/json' },
                                        data: JSON.stringify(userDto),
                                        withCredentials : true,
            });
            let response2 = await axios({
                                        method:'put',
                                        url:'/api/user-genre/genres',
                                        headers: { 'Content-Type' : 'application/json' },
                                        data: JSON.stringify(genredata),
                                        withCredentials : true,
            });
            console.log("요청 1 status : " + response.status);
            console.log("요청 1 data : " + response.data);
            console.log("요청 1 msg : " + response.data.msg);
            console.log("요청 2 status : " + response2.status);
            console.log("요청 2 data : " + response2.data);
            console.log("요청 2 msg : " + response2.data.msg);
        } catch(err)    {
            msg = err.response.data.msg;
            console.log(err);
            alert(msg);
        }
        
    }

    // 첫 마운트시 작동하는 함수
    useEffect(() => {
        const getuser = async() => {
            try {
                const response = await axios({
                                        method:'get',
                                        url: '/api/users/mypage',
                                        withCredentials : true,
                });
                let user = response.data;
                setDefaultName(user.data.userName);
                setNickname(user.data.userName);
                if(user.data.userProfile !== null) { setProfileImage(user.data.userProfile); }
                if(user.data.userContent !== null) { setContent(user.data.userContent); }
            } catch(err)  {
                console.log(err);
            }   
        }
        getuser();
      }, []);

      // nickname이 변경될때마다 작동하는 함수
      useEffect(() => {
        if(checkname)   {
            setCheckname(false);
            setComment('중복확인');
        }
      }, [nickname])

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
                    <label className="profile-update-label">변경 닉네임</label>
                    <input className="profile-update-input" type="text" onChange={(e) => setNickname(e.target.value)} defaultValue={nickname} />
                    <button type='button' className="profile-update-check" onClick={handleCheckName} disabled={checkname}>{comment}</button>
                </div>
                <div className="profile-update-form-group">
                    <label className="profile-update-label">변경 할 한줄 소개</label>
                    <input className="profile-update-input" type="text" defaultValue={content} onChange={(e) => setContent(e.target.value)}/>
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
                            {selectedgenre.map((btn, index) => (
                                <button key={btn} type='button' id="selected-button" style={{ marginLeft: '25px' }} onClick={() => handleDeleteClick(btn)}>
                                    {index+1}순위: {btn}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-update-buttons">
                    <Link to="/profile"><button type="submit" className="profile-update-save" onClick={handleUpdate}>저장</button></Link>
                    <Link to="/profile"><button className="profile-update-cancel">취소</button></Link>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
