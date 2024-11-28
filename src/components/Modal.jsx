import React from 'react';
import PropTypes from 'prop-types';
import '../css/Modal.css'; // 모달 관련 CSS 파일

const Modal = ({ isOpen, closeModal, modalInfo }) => {
    if (!isOpen || !modalInfo) return null; // 모달이 열리지 않으면 렌더링하지 않음

    return (
        <div className="modal" onClick={closeModal}> {/* 바깥 클릭 시 닫힘 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* 컨텐츠 클릭 시 이벤트 전파 방지 */}
                <span className="close " onClick={closeModal}>
                    &times;
                </span>
                <h3>작성자 정보</h3>
                <img src={modalInfo.userProfile} alt="" style={{ width : '50%', height : '20%'}}/>
                <p>닉네임: {modalInfo.userName}</p>
                <p>등급: {modalInfo.userGrade}</p>
                <span>성별 : </span>{modalInfo.userGender == 1 ? <span> 남 </span> : <span> 여 </span>}
                <p>좋아요 : {modalInfo.userLikes}</p>
                <p>선호장르</p><br></br>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalInfo: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    }),
};

export default Modal;
