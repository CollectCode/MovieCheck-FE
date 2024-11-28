import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Modal.css'; // 모달 관련 CSS 파일

const Modal = ({ isOpen, closeModal, modalInfo }) => {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        if (isOpen) {
            setLoading(true); // 모달이 열릴 때 로딩 시작
            // 사용자 정보를 로드하는 비동기 작업을 여기서 할 수 있습니다.
            // 예를 들어, API 요청을 통해 사용자 정보를 가져올 수 있습니다.
            // 데이터가 로드되면 setLoading(false)로 로딩 종료
            const loadUserInfo = async () => {
                // 이 부분에 API 요청을 추가할 수 있습니다.
                // 예시: await fetchUserInfo(modalInfo.userId);
                setTimeout(() => {
                    setLoading(false); // 로딩 완료
                }, 1000); // 예시로 1초 후에 로딩 종료
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
                        <p>좋아요: {modalInfo.userLikes}</p>
                        <p>선호 장르: {modalInfo.userGenres?.join(', ')}</p> {/* 선호 장르 표시 */}
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
