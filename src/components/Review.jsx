import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Review.css';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // 모달 스타일

const Review = ({ movieId, isLogined, reviews, reviewers }) => {
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [likes, setLikes] = useState(Array(reviews.length).fill(0));
    const [modalInfo, setModalInfo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [replyIndex, setReplyIndex] = useState(null); // 답글을 작성할 리뷰 인덱스
    const userKey = Cookies.get('userKey');
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
                    alert("리뷰를 작성하였습니다.");
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
        } else {
            alert("댓글 내용을 입력해주세요.");
        }
    };

    const handleDeleteReview = async(review) => {
        confirmAlert({
            title : '리뷰삭제',
            message: '리뷰를 삭제하시겠습니까?',
            buttons: [
                {
                    label: '예',
                    onClick: async()  => {
                        try {
                            let response = await axios({
                                method: 'delete',
                                url: '/api/reviews/delete',
                                params: { reviewKey : review.reviewKey },
                            });
                            alert('삭제가 완료되었습니다.');
                            window.location.reload();
                        } catch(err)    {
                            alert('삭제에 실패하였습니다.');
                            console.log(err);
                        }
                    }
                }, {
                    label: '아니오',
                    onClick: () => alert('삭제를 취소하였습니다.')
                }
            ]
        });
    }

    const handleEditReview = (index) => {
        // 현재 인덱스가 수정 중인 인덱스와 같으면 수정 모드 종료
        if (editingIndex === index) {
            setEditingIndex(null);
            setEditContent(''); // 내용 초기화
        } else {
            setEditingIndex(index);
            setEditContent(reviews[index].reviewContent); // 수정할 내용 불러오기
        }
    };

    const handleEditSubmit = async (index) => {
        const editData = { reviewKey: reviews[index].reviewKey, reviewContent: editContent, movieKey : movieId};
        console.log(editData);
        if (editContent) {
            try {
                let response = await axios({
                    method: 'post',
                    url: '/api/reviews/create',
                    headers: { 'Content-Type' : 'application/json' },
                    data : JSON.stringify(editData),
                    withCredentials: true,
                });
                console.log(response.data);
                window.location.reload();
                alert("리뷰 변경 완료.");
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

    useEffect(() => {
        console.log(movieId);
        console.log(isLogined);
        console.log(reviews);
        console.log(reviewers);
    }, [])

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
                                        <div className='user-infos'>
                                            <span className='review-username'>{reviewers[index]?.userName}</span>
                                            <span className='review-usergrade'>{reviewers[index]?.userGrade}</span>
                                        </div>
                                    </div>
                                    <div className="review-date">{formatDate(review.reviewTime)}</div>
                                </div>
                                {editingIndex === index ? (
                                    <div className="edit-content">
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        ></textarea>
                                        <button onClick={() => handleEditSubmit(index)}>리뷰수정</button>
                                    </div>
                                ) : (
                                    <p className="review-content">{review.reviewContent}</p>
                                )}
                                <div className="review-actions">
                                    <div className='cud-buttons'>
                                        <button className='comment-button' onClick={() => setReplyIndex(replyIndex === index ? null : index)}>답글</button>
                                        {
                                            userKey == reviewers[index].userKey ? (
                                            <>  
                                                <button className='update-button' onClick={() => handleEditReview(index)}>수정</button>
                                                <button className='delete-button' onClick={() => handleDeleteReview(review)}>삭제</button>
                                            </>
                                            ) : null // userKey가 다를 경우 아무것도 출력하지 않음
                                        }
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
                                        <button onClick={() => handleReplySubmit(index)}>답글작성</button>
                                    </div>
                                    )}
                                    {review.replies && review.replies.length > 0 && (
                                    <div className="replies">
                                        {review.replies.map((reply, replyIdx) => (
                                        <div key={replyIdx} className="reply-item">
                                            <div className="reply-profile" onClick={() => openModal(reviewers[index])}>
                                            <img
                                                src={reviewers[replyIdx]?.userProfile || 'default-profile.png'}
                                                alt="사용자 프로필"
                                                className="reply-user-profile"
                                            />
                                            <span className="reply-username">{reviewers[replyIdx]?.userName}</span>
                                            <span className="reply-usergrade">{reviewers[replyIdx]?.userGrade}</span>
                                            </div>
                                                <div className="reply-content">
                                                    <div className="reply-header">
                                                        <span className="reply-time">여기에 작성 시간을 추가하세요</span>
                                                    </div>
                                                <p className="reply-text">{reply}</p>
                                                <div className='buttons-reply'>
                                                    <button className='update-button-reply' onClick={() => handleEditReview(index)}>수정</button>
                                                    <button className='delete-button-reply' onClick={() => handleDeleteReview(review)}>삭제</button>
                                                </div>
                                            </div>
                                        </div>
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
