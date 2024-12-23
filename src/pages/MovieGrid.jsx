import React, { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MovieCard from '../components/MovieCard';
import PageNation from '../components/Pagenation';
import SkeletonCard from '../components/SkeletonCard';
import '../css/MovieGrid.css'; // 스타일 시트

const MovieGrid = ({ movies, isLoading, currentPage, totalPages, setCurrentPage }) => {
  // 페이지 초기화를 localStorage와 동기화
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage && !isLoading) {
      setCurrentPage(parseInt(savedPage, 10));
    } else {
      setCurrentPage(1);
      localStorage.setItem('currentPage', 1);
    }
  }, []);

  // currentPage 변경 시 localStorage에 저장
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('currentPage', currentPage);
    }
  }, [currentPage, isLoading]);

  return (
    <TransitionGroup>
      <CSSTransition key={currentPage} classNames="fade" timeout={1000}>
        <div className="wrap_movie_grid">
          <div className="movie-grid" style={{ marginBottom: isLoading ? '200px' : '20px' }}>
            {isLoading ? (
              <div className="loading-content">
                <div className="loader"></div> {/* 로딩 애니메이션 */}
                <p>로딩중...</p>
              </div>
            ) : (
              movies?.map((movie) => (
                <MovieCard
                  key={movie.movieKey}
                  title={movie.movieTitle}
                  poster={movie.moviePoster}
                  id={movie.movieKey}
                />
              ))
            )}
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
