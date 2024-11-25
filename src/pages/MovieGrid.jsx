import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MovieCard from '../components/MovieCard';
import PageNation from '../components/Pagenation';
import '../css/MovieGrid.css'; // 스타일 시트
import axios from 'axios';
import SkeletonCard from '../components/SkeletonCard';

const MovieGrid = ({ selectedGenre, isSearched, movies, setMovies, setTotalPages, setCurrentPage, currentPage, totalPages}) => {
  // MovieGrid page
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // 화면 렌더링 시 영화불러오기
  useEffect(() => {
    setIsLoading(true);
    const getMovies = async (page, size) => {
      try {
        const response = await axios({
          method: 'get',
          url: '/api/movies',
          params: {
            page: page-1,
            size: size,
          }
        })
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies(currentPage, pageSize);
  }, [currentPage, pageSize, isSearched]);

  // 장르에 따라 영화 불러오기
  useEffect(() => {
    setIsLoading(true);
    const getMovies = async (page, size) => {
      if(selectedGenre !== "추천")  {
        console.log(selectedGenre);
        try {
          const response = await axios({
            method: 'get',
            url: '/api/movies/genre',
            params: {
              page: page-1,
              size: size,
              genre: selectedGenre,
            }
          });
          setMovies(response.data.movies);
          setTotalPages(response.data.totalPages);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      } else  {
        console.log(selectedGenre);
        try {
          const response = await axios({
            method: 'get',
            url: '/api/movies/user',
            params: {
              page: page-1,
              size: size,
            },
            withCredentials: true,
          });
          console.log(response.data);
          setMovies(response.data.movies);
          setTotalPages(response.data.totalPages);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getMovies(currentPage, pageSize);
  }, [selectedGenre]);

  return (
    <TransitionGroup>
      <CSSTransition key={currentPage} classNames="fade" timeout={1000}>
      <div className="wrap_movie_grid">
        <div className="movie-grid">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
              : movies.map((movie) => (
                  <MovieCard 
                    key={movie.movieKey}
                    title={movie.movieTitle}
                    poster={movie.moviePoster}
                    id={movie.movieKey}
                  />
                ))}
          </div>
          {!isSearched && (
            <PageNation 
                setCurrentPage={setCurrentPage} 
                currentPage={currentPage} 
                totalPages={totalPages} 
            />
          )}
        </div>
      </CSSTransition>
    </TransitionGroup> 
  );
};

export default MovieGrid;
