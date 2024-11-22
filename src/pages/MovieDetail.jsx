import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/MovieDetail.css';
import axios from 'axios';

// MovieDetail page
const MovieDetail = () => {
    const location = useLocation();
    const { id, poster } = location.state || {}; // state에서 데이터 가져오기
    const[title, setTitle] = useState('');
    const[overview, setOverview] = useState('');
    const[score, setScore] = useState('평점이 없습니다.');
    const[runtime, setRunTime] = useState('');
    const[release, setRelease] = useState('');
    const[director, setDirector] = useState('');
    const[actors, setActors] = useState([]);

    useEffect(() => {
        console.log("무비 아이디 : " + id);
        const putmovieId = { movieKey : id };
        const getMovieDetails = async() =>  {
            try {
                let response = await axios({
                    method: 'post',
                    url: '/api/movies/detail',
                    headers: { 'Content-Type' : 'application/json' },
                    data: JSON.stringify(putmovieId),
                });
                console.log(response.data);
                let info = response.data;
                setTitle(info.movieTitle);
                setOverview(info.movieOverview);
                setScore(info.movieScore);
                setRunTime(info.movieRuntime);
                setRelease(info.movieRelease);
                setDirector(info.movieDirector);
                setActors(info.actors);
            } catch(err)    {
                console.log(err);
            }
        }
        getMovieDetails();
    }, []);

    return (
        <div className="movie-detail-container">
            <h1>{title}</h1>
            <div className="movie-introduction">
                <img src={poster} alt="영화 이미지" className="movie-image" />
                <div className="movie-info"> 
                    <h2>소개</h2>
                    <p>{overview}</p>
                </div>
                <div className="movie-crew">
                <h1>감독 이름 : {director}</h1>
                <h2>출연진</h2>
                <div className='actors'>
                    {actors.map((actor) => (
                        <div className="actor">
                            <img src={actor.actorImage} alt="" width="130px"/><br></br> {actor.actorName}
                        </div>
                    ))}
                </div>
            </div>
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
