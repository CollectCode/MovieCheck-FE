import React from 'react';
import MovieCard from '../components/MovieCard';
import PageNation from '../components/Pagenation';
import '../css/MovieGrid.css'; // 스타일 시트

// MovieGrid page
const movies = [
  { id: 1, title: 'I Am Mother', poster: '/images/movie_poster/3933_poster.jpg' },
  { id: 2, title: '이스케이프 룸', poster: '/images/movie_poster/1125510_poster.jpg' },
  { id: 3, title: 'The Merciless', poster: '/images/movie_poster/889737_poster.jpg' },
  { id: 4, title: 'The Truman Show', poster: '/images/movie_poster/1371727_poster.jpg' },
  { id: 5, title: '어벤저스:인피니티워', poster: '/images/movie_poster/420634_poster.jpg' },
  { id: 6, title: '어벤저스:엔드게임', poster: '/images/movie_poster/1084736_poster.jpg' },
  { id: 7, title: '어벤저스:에이지오브울트론', poster: '/images/movie_poster/1022789_poster.jpg' },
  { id: 8, title: '어벤저스:더 퍼스트', poster: '/images/movie_poster/1034541_poster.jpg' },
  { id: 9, title: '반지의제왕:반지원정대', poster: '/images/movie_poster/1159311_poster.jpg' },
  { id: 10, title: '반지의제왕:반지원정대', poster: '/images/movie_poster/991610_poster.jpg' },
  // 추가 영화 데이터
];

const MovieGrid = () => {
  return (
    <div className="wrap_movie_grid">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} poster={movie.poster} />
        ))}
      </div>
      <PageNation />
    </div>
  );
};

export default MovieGrid;
