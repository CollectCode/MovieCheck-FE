import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import PageNation from '../components/Pagenation';
import '../css/MovieGrid.css'; // 스타일 시트
import axios from 'axios';

const MovieGrid = () => {
  // MovieGrid page
  const[movies, setMovies] = useState([]);

  // 화면 렌더링 시 영화불러오기
  useEffect(() => {
    const getMovies = async() => {
      try {
        let response = await axios({
          method: 'get',
          url: '/api/movies',
        });
        console.log(response.data.movies.movieKey);
        console.log(response.data.movies.length);
        console.log(response.data.movies);
        setMovies(response.data.movies);
        console.log(response);
      } catch(err)  {
        console.log(err);
      }
    }
    getMovies();
  }, []);

  return (
    <div className="wrap_movie_grid">
      <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.movieKey} title={movie.movieTitle} poster={movie.moviePoster} />
      ))}
      </div>
        <PageNation pageperItems={10} />
    </div>
  );
};

export default MovieGrid;
