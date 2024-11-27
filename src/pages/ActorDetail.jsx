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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getActorDetails = async () => {
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
            }
        };
        if (id) {
            getActorDetails();
        }
    }, [id]);

    if (!moviePosters) {
        return <div className="actor-detail-container">Loading...</div>;
    }

    return (
        <div className="actor-detail-container">
            <h1>배우 소개</h1>
            <div className="actor-information">
                <div className="actor-introduction">
                    <img src={actorImage} alt={`${actorName} 사진`} className="actor-image" />
                    <div className="actor-info">
                        <h2>{actorName}</h2>
                        <p><strong>생일:</strong> {actorBirthday === null ? <strong>???</strong> : actorBirthday}{actorDeathday === null ? <strong>~</strong> : ~ actorDeathday} </p>
                        <p><strong>출생지:</strong> {actorBirthplace === null ? <strong>정보가 없습니다.</strong> : actorBirthplace}</p>
                    </div>
                </div>
                <div className="actor-movies">
                    <h2>출연 작품</h2>
                    <div className="movie-list">
                        {movieKeys.map((movie, index) => (
                            <Link to={`/detail/${movie}`}>
                                <div key={index} className="movie-item">
                                    <img 
                                        src={moviePosters[index] || ''} 
                                        alt={`${moviePosters[index]} 포스터`} 
                                        className="movie-poster" 
                                    />
                                    <p style={{ fontSize : "15px", fontWeight : "bold", color : "white", marginTop : "10px"}}>{movieTitles[index]}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorDetail;
