import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieGrid from '../pages/MovieGrid';

const MovieLoader = ({ searchTerm, movies, setMovies, isLogined, setSelectedGenre, selectedGenre, isSearched, currentPage, setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const pageSize = 10;

  // 데이터 로딩
  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        let response;
        if (isSearched && searchTerm) {
          // 검색 결과 요청
          response = await axios({
            method: 'get',
            url: '/api/movies/search',
            params: {
              page: currentPage - 1, // 현재 페이지에서 1을 빼줌
              size: pageSize,
              keyword: searchTerm,
            }
          });
        } else {
          // 일반 영화 요청
          if (selectedGenre === "전체보기") {
            response = await axios({
              method: 'get',
              url: '/api/movies',
              params: {
                page: currentPage - 1,
                size: pageSize,
              },
            });
          } else if (selectedGenre === "사용자 추천") {
            if (isLogined) {
              response = await axios({
                method: 'get',
                url: '/api/movies/user',
                params: {
                  page: currentPage - 1,
                  size: pageSize,
                },
                withCredentials: true,
              });
            } else {
              alert("로그인이 필요한 서비스입니다.");
              setSelectedGenre("전체보기");
              navigate("/login", { state: { selectedGenre: "전체보기" } });
              return; // 로그인 페이지로 이동할 경우 함수 종료
            }
          } else {
            response = await axios({
              method: 'get',
              url: '/api/movies/genre',
              params: {
                page: currentPage - 1,
                size: pageSize,
                genre: selectedGenre,
              },
            });
          }
        }
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [selectedGenre, currentPage, isSearched, searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages+1); // totalPages가 현재 페이지보다 작으면 페이지를 조정
    }
  }, [currentPage, totalPages, setCurrentPage]);

  // MovieGrid로 데이터 전달
  return (
    <MovieGrid
      movies={movies}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      isSearched={isSearched}
      isLogined={isLogined}
    />
  );
};

export default MovieLoader;
