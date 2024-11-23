import React, { useState } from 'react';
import axios from 'axios';

const Comment = () =>   {
    const[review, setReview] = useState('');
    
    return(
        <div className='review-wrapper'>
            <div className="review-section">
                <h2>리뷰 쓰기</h2>
                <textarea placeholder="영화를 감상한 후 의견을 작성해주세요." className="review-input"></textarea>
                <button className="submit-review">리뷰 등록</button>
            </div>
            <h2>리뷰</h2>
            <div className="existing-reviews">
                <div className="review">
                    <div className="review-details">
                        <span className="review-date">2023-11-06</span>
                        <span className="review-author">작성자 이름</span>
                    </div>
                    <p>영화가 정말 재미있어요!</p>
                    <div className="review-rating">
                        <button className="like-button">좋아요</button>
                        <button className="dislike-button">싫어요</button>
                    </div>
                </div>
            </div>
            <div className="existing-reviews">
                <div className="review">
                    <div className="review-details">
                        <span className="review-date">2023-11-06</span>
                        <span className="review-author">작성자 이름</span>
                    </div>
                    <p>영화가 정말 재미있어요!</p>
                    <div className="review-rating">
                        <button className="like-button">좋아요</button>
                        <button className="dislike-button">싫어요</button>
                    </div>
                </div>
                {/* 추가 리뷰를 여기에 추가 */}
            </div>
            <div className="existing-reviews">
                <div className="review">
                    <div className="review-details">
                        <span className="review-date">2023-11-06</span>
                        <span className="review-author">작성자 이름</span>
                    </div>
                    <p>영화가 정말 재미있어요!</p>
                    <div className="review-rating">
                        <button className="like-button">좋아요</button>
                        <button className="dislike-button">싫어요</button>
                    </div>
                </div>
                {/* 추가 리뷰를 여기에 추가 */}
            </div>
            <div className="existing-reviews">
                <div className="review">
                    <div className="review-details">
                        <span className="review-date">2023-11-06</span>
                        <span className="review-author">작성자 이름</span>
                    </div>
                    <p>영화가 정말 재미있어요!</p>
                    <div className="review-rating">
                        <button className="like-button">좋아요</button>
                        <button className="dislike-button">싫어요</button>
                    </div>
                </div>
                {/* 추가 리뷰를 여기에 추가 */}
            </div>
        </div>
    );
}

export default Comment