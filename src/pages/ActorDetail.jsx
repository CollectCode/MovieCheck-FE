import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/ActorDetail.css';
import axios from 'axios';

const ActorDetail = () => {
    const { id } = useParams();
    const [actorName, setActorName] = useState('');
    const [actorImage, setActorImage] = useState('');
    const [actorBirthday, setActorBirthday] = useState('');
    const [actorDeathday, setActorDeathday] = useState('');
    const [actorBirthplace, setActorBirthPlace] = useState('');
    const [movieKeys, setMovieKeys] = useState([]);
    const [movieTitles, setMovietitles] = useState([]);
    const [moviePosters, setMoviePosters] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 초기값을 true로 설정

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getActorDetails = async () => {
            setIsLoading(true); // 데이터 요청 시작 전에 로딩 상태 설정
            try {
                const response = await axios.get(`/api/actors/detail?id=${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log(response.data);
                let info = response.data;
                setActorName(info.actorName);
                setActorImage(info.actorImage);
                setActorBirthday(info.actorBirthday);
                setActorDeathday(info.actorDeathday);
                setActorBirthPlace(info.actorBirthplace);
                setMovieKeys(info.movieKeys);
                setMovietitles(info.movieTitles);
                setMoviePosters(info.moviePosters);
            } catch (err) {
                console.error("Failed to fetch actor details:", err);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };
        if (id) {
            getActorDetails();
        }
    }, [id]);

    return (
        <div className="actor-detail-container">
            {isLoading ? (
                <div className="loading-content">
                    <div className="loader"></div> {/* 로딩 애니메이션 */}
                    <p>로딩중...</p>
                </div>
            ) : (
                <div>
                    <div className="actor-information">
                        <h1>배우 소개</h1>
                            <div className="actor-introduction">
                                <img src={actorImage} alt={`${actorName} 사진`} className="actor-image" />
                                <div className="actor-info">
                                    <h2>{actorName}</h2>
                                    <p>
                                        <strong>생일:</strong> {actorBirthday === null ? <strong>???</strong> : actorBirthday}
                                        {actorDeathday === null ? <strong>~</strong> : `~ ${actorDeathday}`}
                                    </p>
                                    <p>
                                        <strong>출생지:</strong> {actorBirthplace === null ? <strong>정보가 없습니다.</strong> : actorBirthplace}
                                    </p>
                                </div>
                            </div>
                        <div className="actor-movies">
                            <h2>출연 작품</h2>
                            <div className="movie-list">
                                {movieKeys.map((movie, index) => (
                                    <Link to={`/detail/${movie}`} key={index}>
                                        <div className="movie-item">
                                            <img
                                                src={moviePosters[index] || ''}
                                                alt={`${moviePosters[index]} 포스터`}
                                                className="movie-poster"
                                            />
                                            <p style={{ fontSize: "15px", fontWeight: "bold", color: "white", marginTop: "10px" }}>
                                                {movieTitles[index]}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActorDetail;
