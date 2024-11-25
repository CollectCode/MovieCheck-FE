import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import LoginedHeader from './components/LoginedHeader';
import UnLoginedHeader from './components/UnLoginedHeader';
import NavigationBar from './components/NavigationBar';
import MovieGrid from './pages/MovieGrid';
import Footer from './components/Footer';
import MovieDetail from './pages/MovieDetail';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1; // 초기값 설정
  });
  const location = useLocation();

  useEffect(() => {
    setIsLogined(!!document.cookie);
  }, [isLogined]);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={200}>
        <div className="app">
          {!!isLogined ? <LoginedHeader setIsSearched={setIsSearched} setIsLogined={setIsLogined} setMovies={setMovies} setTotalPages={setTotalPages} setCurrentPage={setCurrentPage} /> : <UnLoginedHeader setIsSearched={setIsSearched} setMovies={setMovies} setTotalPages={setTotalPages} setCurrentPage={setCurrentPage} />}
          <div className="container">
            <NavigationBar />
            <div className="main-content">
              <Routes location={location}>
                <Route path="/" element={<MovieGrid isSearched={isSearched} movies={movies} setMovies={setMovies} setTotalPages={setTotalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>}/>
                <Route path="/detail/:id" element={<MovieDetail />} />
                <Route path="/login" element={<LoginForm setIsLogined={setIsLogined} />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/profile" element={<Profile setIsLogined={setIsLogined} />} />
                <Route path="/profileupdate" element={<ProfileUpdate />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

// Router를 App 컴포넌트 내부로 이동
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
