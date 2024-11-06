import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/MovieDetail.css';

const MovieDetail = () => {

    const location = useLocation();
    const { id, poster } = location.state || {}; // state에서 데이터 가져오기

    return (
        <div className="movie-detail-container">
            <h1>영화 제목</h1>
            <div className="movie-introduction">
                <img src={poster} alt="영화 이미지" className="movie-image" />
                <div className="movie-info"> 
                    <h2>소개</h2>
                    <p>
                        영화에서 가장 믿을 수 있는 시리즈인 <strong>에이리언</strong>의 리부트 스토리.
                        <br />
                        - 이젠 더이상 다가올 수 없는 전쟁의 후유증을 겪고 있는 인류.
                        <br />
                        ...
                    </p>
                </div>
            </div>
            <div className="movie-crew">
                <h2>감독</h2>
                <p>감독 이름</p>
                <h2>출연진</h2>
                <p>출연진 이름</p>
            </div>
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
};

export default MovieDetail;
