import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Review.css';
import Modal from './Modal';

const Review = ({ movieId, isLogined, reviews, reviewers }) => {
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(Array(reviews.length).fill(0)); // 리뷰 별 좋아요 카운트
    const [modalInfo, setModalInfo] = useState(null); // 모달에 표시할 사용자 정보
    const navigate = useNavigate();

    // 시간 형식 처리
    const formatDate = (dateTime) => {
        return dateTime.toString().replace('T', ' ').split('.')[0];
    };

    // 리뷰 제출 처리
    const handleOnSubmit = async () => {
        if (isLogined) {
            if(content) {
                const sendData = {
                    movieKey: movieId,
                    reviewContent: content,
                };
                try {
                    const response = await axios.post('/api/reviews/create', sendData, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });
                    console.log(response.data);
                } catch (err) {
                    if (err.status === 409) {
                        alert("영화당 하나의 리뷰만 작성하실 수 있습니다.");
                    }
                    console.error(err);
                }
                window.location.reload();
            }  else  {
                alert("내용을 적어주세요.");
            }
        } else {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    };

    // 좋아요 처리
    const handleLike = (index) => {
        const updatedLikes = [...likes];
        updatedLikes[index] += 1;
        setLikes(updatedLikes);
    };

    // 모달 열기
    const openModal = (reviewer) => {
        setModalInfo(reviewer);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalInfo(null); // modalInfo를 초기화하여 모달을 닫음
    };


    return (
        <div className="review-wrapper">
            <h2>리뷰 쓰기</h2>
            <div className="review-section">
                <textarea
                    placeholder="영화를 감상한 후 의견을 작성해주세요."
                    className="review-input"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button className="submit-review" onClick={handleOnSubmit}>
                    리뷰 등록
                </button>
            </div>
            {reviews && reviews.length > 0 ? (
                <div>
                    <h2>리뷰</h2>
                    <div className="existing-reviews">
                        {reviews.map((review, index) => (
                            <div className="review-details" key={index}>
                                <div className="review-header">
                                    <div className="user-info">
                                        <img
                                            src={reviewers[index]?.userProfile || 'default-profile.png'}
                                            alt="사용자 프로필"
                                            className="user-profile"
                                        />
                                        <span
                                            className="nickname"
                                            onClick={() => openModal(reviewers[index])}
                                        >
                                            {reviewers[index]?.userName}
                                        </span>
                                    </div>
                                    <span className="review-date">{formatDate(review.reviewTime)}</span>
                                </div>
                                <p className="review-content">{review.reviewContent}</p>
                                <div className="review-actions">
                                    <button className="like-button" onClick={() => handleLike(index)}>
                                        좋아요 👍 {likes[index]}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h2 style={{ textAlign: 'center' }}>리뷰가 없어요! 작성해주세요...</h2>
            )}

            {/* 모달 창임 */}
            {modalInfo && (
                <div>
                    {/* 모달 열기 버튼 예시 */}
                    <button onClick={() => openModal({ userName: '홍길동', email: 'example@example.com' })}>
                        작성자 정보 보기
                    </button>
        
                    {/* 모달 창 */}
                    <Modal isOpen={!!modalInfo} closeModal={closeModal} modalInfo={modalInfo} />
                </div>
            )}
        </div>
    );
};

export default Review;
