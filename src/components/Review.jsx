import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Review.css';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // 모달 스타일

const Review = ({ movieId, isLogined }) => {
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [modalInfo, setModalInfo] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [replyContent, setReplyContent] = useState(''); // 답글을 작성할 내용
    const [replyIndex, setReplyIndex] = useState(null); // 답글을 작성할 리뷰 인덱스
    const [editingReplyIndex, setEditingReplyIndex] = useState(null); // 수정 중인 댓글의 인덱스
    const [editingReplyContent, setEditingReplyContent] = useState(''); // 수정 중인 댓글 내용
    const [reviewOrComment, setReviewOrComment] = useState(0);
    const [likeButtons, setLikeButtons] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewers, setReviewers] = useState([]);
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

    const handleReplySubmit = async(review) => {
        if(isLogined)   {
            if(replyContent)    {
            const repData = { 
                reviewKey : review.reviewKey,
                commentContent : replyContent,
            }
            try {
                let response = await axios({
                    method: 'post',
                    url: '/api/comment',
                    headers: { 'Content-Type' : 'application/json' },
                    data: JSON.stringify(repData),
                    withCredentials: true, 
                });
                console.log(response);
                alert("답글을 성공적으로 등록하였습니다!");
                window.location.reload();
            } catch(err)    {
                console.log(err);
            }
            } else  {
                alert("답글 내용을 기입해주세요");
            }
        } else  {
            alert("로그인이 필요한 서비스 입니다.");
            navigate("/login", {});
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
                            console.log(response);
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
            setReviewOrComment(0);
        } else {
            setEditingIndex(index);
            setEditContent(reviews[index].reviewContent); // 수정할 내용 불러오기
        }
        setReviewOrComment(1);
    };

    const handleEditReply = (index, reply) => {
        if (editingReplyIndex === index) {
            setEditingReplyIndex(null);
            setEditingReplyContent('');
            setReviewOrComment(0);
        } else {
            setEditingReplyIndex(index);
            setEditingReplyContent(reply.commentContent);
        }
        setReviewOrComment(2);
    };

    const handleEditReplySubmit = async (reply) => {
        // 양쪽 공백 제거
        if (editingReplyContent.trim()) {
            try {
                const response = await axios({
                    method: 'post',
                    url: '/api/comment',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({
                        reviewKey : reply.reviewKey,
                        commentKey: reply.commentKey,
                        commentContent: editingReplyContent,
                    }),
                    withCredentials: true,
                });
                console.log(response);
                alert('댓글이 수정되었습니다.');
                window.location.reload();
            } catch (err) {
                console.error(err);
                alert('댓글 수정에 실패했습니다.');
            }
        } else {
            alert('내용을 입력해주세요.');
        }
    };

    const handleDeleteReply = async(reply) =>  {
        try {
            let response = await axios({
                method: 'delete',
                url: '/api/comment',
                params: { commentKey : reply.commentKey },
                withCredentials: true,
            });
            console.log(response);
            alert("댓글 제거 완료했습니다!");
            window.location.reload();
        } catch(err)    {
            console.log(err);
        }
    }

    const handleEditSubmit = async (index) => {
        const editData = { reviewKey: reviews[index].reviewKey, reviewContent: editContent, movieKey : movieId};
        if (editContent) {
            try {
                let response = await axios({
                    method: 'post',
                    url: '/api/reviews/create',
                    headers: { 'Content-Type' : 'application/json' },
                    data : JSON.stringify(editData),
                    withCredentials: true,
                });
                console.log(response);
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

    const handleLike = async (review, index) => {
        if(isLogined)   {
            try {
                const updatedReviews = [...reviews];
                const isLiked = likeButtons.includes(review.reviewKey);
                if (isLiked) {
                    // 좋아요 취소
                    updatedReviews[index].reviewLike -= 1;
                    setLikeButtons((prev) =>
                        prev.filter((key) => key !== review.reviewKey)
                    );
                } else {
                    // 좋아요 추가
                    updatedReviews[index].reviewLike += 1;
                    setLikeButtons((prev) => [...prev, review.reviewKey]);
                }
                setReviews(updatedReviews);

                let response = await axios.get('/api/like', {
                    headers: { 'Content-Type': 'application/json' },
                    params: { reviewKey: review.reviewKey },
                    withCredentials: true,
                });

                console.log(response.data);
            } catch (err) {
                console.error(err);
                // 서버 요청 실패 시 UI 복구
                const revertedReviews = [...reviews];
                if (likeButtons.includes(review.reviewKey)) {
                    revertedReviews[index].reviewLike -= 1;
                    setLikeButtons((prev) =>
                        prev.filter((key) => key !== review.reviewKey)
                    );
                } else {
                    revertedReviews[index].reviewLike += 1;
                    setLikeButtons((prev) => [...prev, review.reviewKey]);
                }
                setReviews(revertedReviews);
            }
        } else  {
            alert("로그인이 필요한 서비스 입니다.");
            navigate("/login", {});
        }
    };
    

    const openModal = (reviewer) => {
        setModalInfo(reviewer);
    };

    const closeModal = () => {
        setModalInfo(null);
    };

    useEffect(() => {
        const getReview = async () => {
            console.log(movieId);
            try {
                let response = await axios({
                    method: 'get',
                    url: `/api/reviews?id=${movieId}`,
                    headers: { 'Content-Type': 'application/json' },
                });
                setReviews(response.data.reviews);
                setReviewers(response.data.reviewers);
            } catch (err) {
                console.log(err);
            }
        };

        const getLikeButtons = async() =>   {
            try {
                let response = await axios({
                    method: 'get',
                    url: '/api/like/button',
                    withCredentials: true,
                });
                setLikeButtons(response.data.map(review => review.reviewKey));
            } catch(err)    {
                console.log(err);
            }
        }
        getReview();
        getLikeButtons();
    }, [movieId]);

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
                                            <span className='review-usergrade'>{reviewers[index]?.userGrade}</span>
                                            <span className='review-username'>{reviewers[index]?.userName}</span>
                                        </div>
                                    </div>
                                    <div className="review-date">{formatDate(review.reviewTime)}</div>
                                </div>
                                {editingIndex === index && reviewOrComment === 1 ? (
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
                                    {likeButtons.includes(review.reviewKey) 
                                        ? 
                                        <button className="like-button" onClick={() => handleLike(review, index)}  style={{ background : '#0aafff'}}>
                                            좋아요 👍 {review.reviewLike}
                                        </button>
                                        :
                                        <button className="like-button" onClick={() => handleLike(review, index)}>
                                            좋아요 👍 {review.reviewLike}
                                        </button>
                                    }
                                </div>
                                <div className="divider"></div>
                                {replyIndex === index && (
                                    <div className="reply-section">
                                        <textarea
                                        placeholder="답글을 작성하세요."
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        />
                                        <button onClick={() => handleReplySubmit(review)}>답글작성</button>
                                    </div>
                                    )}
                                    {review.commentDto && review.commentDto.length > 0 && (
                                    <div className="replies">
                                        {review.commentDto.map((reply, replyIdx) => (
                                            <div key={replyIdx} className="reply-item">
                                                <div className="reply-profile" onClick={() => openModal(review.commenters?.[replyIdx])}>
                                                    <img
                                                        src={review.commenters?.[replyIdx]?.userProfile}
                                                        alt="사용자 프로필"
                                                        className="reply-user-profile"
                                                    />
                                                    <span className="reply-usergrade">{review.commenters?.[replyIdx]?.userGrade}</span>
                                                    <span className="reply-username">{review.commenters?.[replyIdx]?.userName}</span>
                                                </div>
                                                <div className="reply-content">
                                                    <div className="reply-header">
                                                        <span className="reply-time">{formatDate(review.commentDto?.[replyIdx]?.commenTime)}</span>
                                                    </div>
                                                    {editingReplyIndex === replyIdx && reviewOrComment === 2 ? (
                                                        <div className="edit-reply-content">
                                                            <textarea
                                                                value={editingReplyContent}
                                                                onChange={(e) => setEditingReplyContent(e.target.value)}
                                                            ></textarea>
                                                            <button onClick={() => handleEditReplySubmit(reply)}>수정완료</button>
                                                        </div>
                                                    ) : (
                                                        <p className="reply-text">{reply.commentContent}</p>
                                                    )}
                                                    <div className="buttons-reply">
                                                        {userKey == review.commenters?.[replyIdx]?.userKey ? (
                                                            <>
                                                                <button
                                                                    className="update-button-reply"
                                                                    onClick={() => handleEditReply(replyIdx, reply)}
                                                                >
                                                                    수정
                                                                </button>
                                                                <button
                                                                    className="delete-button-reply"
                                                                    onClick={() => handleDeleteReply(reply)}
                                                                >
                                                                    삭제
                                                                </button>
                                                            </>
                                                        ) : null}
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
