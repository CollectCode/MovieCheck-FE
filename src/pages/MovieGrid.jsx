import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MovieCard from '../components/MovieCard';
import PageNation from '../components/Pagenation';
import SkeletonCard from '../components/SkeletonCard';
import '../css/MovieGrid.css'; // 스타일 시트

const MovieGrid = ({ movies, isLoading, currentPage, totalPages, setCurrentPage }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={currentPage} classNames="fade" timeout={1000}>
        <div className="wrap_movie_grid">
          <div className="movie-grid">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : movies.map((movie) => (
                  <MovieCard
                    key={movie.movieKey}
                    title={movie.movieTitle}
                    poster={movie.moviePoster}
                    id={movie.movieKey}
                  />
                ))}
          </div>
            <PageNation
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default MovieGrid;
