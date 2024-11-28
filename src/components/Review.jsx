import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Review.css';
import Modal from './Modal';

const Review = ({ movieId, isLogined, reviews, reviewers }) => {
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(Array(reviews.length).fill(0));
    const [modalInfo, setModalInfo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [replyIndex, setReplyIndex] = useState(null); // 답글을 작성할 리뷰 인덱스
    const navigate = useNavigate();

    const formatDate = (dateTime) => {
        return dateTime.toString().replace('T', ' ').split('.')[0];
    };

    const handleOnSubmit = async () => {
        if (isLogined) {
            if (content) {
                const sendData = { movieKey: movieId, reviewContent: content };
                try {
                    await axios.post('/api/reviews/create', sendData, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });
                    window.location.reload();
                } catch (err) {
                    if (err.response.status === 409) {
                        alert("영화당 하나의 리뷰만 작성하실 수 있습니다.");
                    }
                    console.error(err);
                }
            } else {
                alert("내용을 적어주세요.");
            }
        } else {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    };

    const handleReplySubmit = (index) => {
        if (replyContent) {
            const updatedReviews = [...reviews];
            updatedReviews[index].replies = updatedReviews[index].replies || [];
            updatedReviews[index].replies.push(replyContent);
            setReplyContent('');
            // 서버에 답글을 추가하는 요청을 보낼 수도 있습니다.
        } else {
            alert("답글 내용을 입력해주세요.");
        }
    };

    const handleDelete = (index) => {

    }

    const handleEdit = (index) => {
        setEditingIndex(index);
        setContent(reviews[index].reviewContent);
    };

    const handleEditSubmit = async (index) => {
        if (content) {
            try {
                let response = await axios({
                    method: 'post',
                    url: '/api/reviews/create',
                    headers: { 'Content-Type' : 'application/json' },
                    withCredentials: true,
                });
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
            setEditingIndex(null);
        } else {
            alert("내용을 입력해주세요.");
        }
    };

    const handleLike = (index) => {
        const updatedLikes = [...likes];
        updatedLikes[index] += 1;
        setLikes(updatedLikes);
    };

    const openModal = (reviewer) => {
        setModalInfo(reviewer);
    };

    const closeModal = () => {
        setModalInfo(null);
    };

    return (
        <div className="review-wrapper">
            <h2>리뷰 작성</h2>
            <div className="review-section">
                <textarea
                    placeholder="영화에 대한 의견을 작성해주세요."
                    className="review-input"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button className="submit-review" onClick={handleOnSubmit}>
                    리뷰등록
                </button>
            </div>
            {reviews && reviews.length > 0 ? (
                <div>
                    <h2>리뷰</h2>
                    <div className="existing-reviews">
                        {reviews.map((review, index) => (
                            <div className="review-details" key={index}>
                                <div className="review-header">
                                    <div className="user-info"
                                        onClick={() => openModal(reviewers[index])}>
                                        <img
                                            src={reviewers[index]?.userProfile || 'default-profile.png'}
                                            alt="사용자 프로필"
                                            className="user-profile"
                                        />
                                        <span>
                                            {reviewers[index]?.userName}
                                        </span>
                                    </div>
                                    <div className="review-date">{formatDate(review.reviewTime)}</div>
                                </div>
                                {editingIndex === index ? (
                                    <div className="edit-review">
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        ></textarea>
                                        <button onClick={() => handleEditSubmit(index)}>완료</button>
                                    </div>
                                ) : (
                                    <p className="review-content">{review.reviewContent}</p>
                                )}
                                <div className="review-actions">
                                    <div className='cud-buttons'>
                                        <button className='comment-button' onClick={() => setReplyIndex(replyIndex === index ? null : index)}>답글</button>
                                        <button className='update-button' onClick={() => handleEdit(index)}>수정</button>
                                        <button className='delete-button' onClick={() => handleDelete(index)}>삭제</button>
                                    </div>
                                    <button className="like-button" onClick={() => handleLike(index)}>
                                        좋아요 👍 {likes[index]}
                                    </button>
                                </div>
                                {replyIndex === index && (
                                    <div className="reply-section">
                                        <textarea
                                            placeholder="답글을 작성하세요."
                                            value={replyContent} 
                                            onChange={(e) => setReplyContent(e.target.value)}
                                        />
                                        <button onClick={() => handleReplySubmit(index)}>답글 작성</button>
                                    </div>
                                )}
                                {review.replies && review.replies.length > 0 && (
                                    <div className="replies">
                                        {review.replies.map((reply, replyIndex) => (
                                            <div key={replyIndex} className="reply-content">{reply}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h2 style={{ textAlign: 'center' }}>리뷰가 없어요! 작성해주세요...</h2>
            )}
            {modalInfo && (
                <Modal isOpen={!!modalInfo} closeModal={closeModal} modalInfo={modalInfo} />
            )}
        </div>
    );
};

export default Review;
