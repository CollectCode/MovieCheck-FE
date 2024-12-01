import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../css/Modal.css'; // 모달 관련 CSS 파일

const Modal = ({ isOpen, closeModal, modalInfo }) => {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if (isOpen && modalInfo.userKey) {
            setLoading(true); 
            const loadUserInfo = async () => {
                let response = await axios({
                    method: 'get',
                    url: '/api/user-genre/modal/genres',
                    params: { userKey : modalInfo.userKey },
                });
                console.log(response.data.data);
                console.log(modalInfo);
                setGenres(response.data.data);   
                setTimeout(() => {
                    setLoading(false); // 로딩 완료
                }, 500); // 예시로 1초 후에 로딩 종료
            };
            loadUserInfo();
        }
    }, [isOpen, modalInfo]);

    if (!isOpen || !modalInfo) return null; // 모달이 열리지 않으면 렌더링하지 않음

    return (
        <div className="modal" onClick={closeModal}> {/* 바깥 클릭 시 닫힘 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <h3>작성자 정보</h3>
                {loading ? (
                    <div className="loading">로딩 중...</div> // 로딩 중일 때 표시
                ) : (
                    <>
                        <img src={modalInfo.userProfile} alt="" style={{ width: '50%', height: '20%' }} />
                        <p>닉네임: {modalInfo.userName}</p>
                        <p>등급: {modalInfo.userGrade}</p>
                        <span>성별: </span>{modalInfo.userGender === 1 ? <span> 남 </span> : <span> 여 </span>}
                        <p>좋아요: {modalInfo.userLikeCount}</p>
                        <p>선호 장르: [ {genres.map((genre, index) => genre.genreName + (genres.length > index+1 ? ", " : " "))}]</p> {/* 선호 장르 표시 */}
                    </>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalInfo: PropTypes.shape({
        userName: PropTypes.string.isRequired,
        userProfile: PropTypes.string.isRequired,
        userGrade: PropTypes.string,
        userGender: PropTypes.number,
        userLikes: PropTypes.number,
        userGenres: PropTypes.arrayOf(PropTypes.string), // 선호 장르 배열
    }),
};

export default Modal;
