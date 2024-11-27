import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/MovieDetail.css';
import axios from 'axios';
import Comment from '../components/Comment';

// MovieDetail page
const MovieDetail = () => {
    const[poster, setPoster] = useState('');
    const[title, setTitle] = useState('');
    const[overview, setOverview] = useState('');
    const[score, setScore] = useState('평점이 없습니다.');
    const[runtime, setRunTime] = useState('');
    const[release, setRelease] = useState('');
    const[director, setDirector] = useState('');
    const[actors, setActors] = useState([]);
    const[genres, setGenres] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log(id);
        const getMovieDetails = async() =>  {
            try {
                let response = await axios({
                    method: 'get',
                    url: `/api/movies/detail?id=${id}`,
                    headers: { 'Content-Type' : 'application/json' },
                });
                console.log(response.data);
                let info = response.data;
                setTitle(info.movieTitle);
                setPoster(info.moviePoster);
                setOverview(info.movieOverview);
                setScore(info.movieScore);
                setRunTime(info.movieRuntime);
                setRelease(info.movieRelease);
                setDirector(info.directorDto);
                setActors(info.actorDto);
                setGenres(info.genresName);
            } catch(err)    {
                console.log(err.data);
            }
        }
        getMovieDetails();
    }, [id]);

    return (
        <div className="movie-detail-container">
            <h1>{title}</h1>
            <div className='movie-information'>
                <div className="movie-introduction">
                    <img src={poster} alt="영화 이미지" className="movie-image" />
                    <div className="movie-info">
                        <div className='movie-info-content'>
                            <h1>영화 소개</h1>
                            <h3>줄거리</h3>
                            <p>{overview}</p>
                            <h3>장르</h3>
                            <div>[{genres.map((genre, index) => (
                                index < genres.length-1 ? <span>{genre}, </span> : <span>{genre}</span>
                            ))}]</div>
                            <h3>개봉일</h3>
                            <p>{release}</p>
                            <h3>평점</h3>
                            <p>{score}</p>
                            <h3>상영 시간(분)</h3>
                            <p>{runtime}</p>
                        </div>
                    </div>
                    <div className="movie-crew">
                        <h2>감 독</h2>
                        <div className='director'>
                            <img src={director.directorImage} alt="" width="150px"/><br></br>{director.directorName}
                        </div>
                        <h2>주 연</h2>
                        <div className='actors'>
                            {actors.map((actor) => (
                                <Link to={`/actor/${actor.actorKey}`} key={actor.actorKey} style={{ textDecoration : "none", color : "white"}}>
                                    <div className="actor">
                                        <img src={actor.actorImage} alt={actor.actorName} width="150px" /><br />
                                        {actor.actorName}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Comment />
        </div>
    );
};

export default MovieDetail;
