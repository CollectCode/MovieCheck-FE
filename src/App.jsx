import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginedHeader from './components/LoginedHeader';
import UnLoginedHeader from './components/UnLoginedHeader';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import MovieLoader from './components/MovieLoader';
import './App.css';

const App = () => {
    const [navmode, setNavMode] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('전체보기');
    const [movies, setMovies] = useState([]);
    const [isLogined, setIsLogined] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : 1; // 초기값 설정
    });
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const location = useLocation();

    useEffect(() => {
        const cookies = document.cookie.split('; ');
        const hasOtherCookies = cookies.length > 0 && cookies.some(cookie => cookie && !cookie.startsWith('abuse_interstitial='));
        setIsLogined(hasOtherCookies);
    }, []);
    
    useEffect(() => {
        setSearchTerm('');
    }, [selectedGenre]);

    // 특정 경로에서 NavigationBar를 숨김
    const hideNavigationBar = () => {
        const path = location.pathname;
        const basePaths = ['/login', '/signup', '/profile', '/profileupdate'];

        // 기본 경로들에 대한 검사
        if (basePaths.includes(path)) {
            return true;
        }

        // /detail/:id 경로에 대한 정규 표현식 검사
        const detailPathPattern = /^\/detail\/[^/]+$/; // 숫자나 문자열 ID를 가진 경로(영화)
        if (detailPathPattern.test(path)) {
            return true;
        }

        const actorPathPattern = /^\/actor\/[^/]+$/; // 숫자나 문자열 ID를 가진 경로(배우)
        if (actorPathPattern.test(path))    {
            return true;
        }

        return false;
    };

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <div className="app">
                    {!!isLogined ? (
                        <LoginedHeader
                            setCurrentPage={setCurrentPage}
                            selectedGenre={selectedGenre}
                            setSelectedGenre={setSelectedGenre}
                            setIsSearched={setIsSearched}
                            setIsLogined={setIsLogined}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    ) : (
                        <UnLoginedHeader
                        setCurrentPage={setCurrentPage}
                            selectedGenre={selectedGenre}
                            setSelectedGenre={setSelectedGenre}
                            setIsSearched={setIsSearched}
                            setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm}
                        />
                    )}
                    <div className="container">
                        {!hideNavigationBar() && (
                            <NavigationBar setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} />
                        )}
                        <div className="main-content">
                            <Routes location={location}>
                                <Route
                                    path="/"
                                    element={
                                        <MovieLoader
                                            searchTerm={searchTerm}
                                            movies={movies}
                                            setMovies={setMovies}
                                            isLogined={isLogined}
                                            setSelectedGenre={setSelectedGenre}
                                            selectedGenre={selectedGenre}
                                            isSearched={isSearched}
                                            setCurrentPage={setCurrentPage}
                                            currentPage={currentPage}
                                        />
                                    }
                                />
                                <Route path="/actor/:id" element={<ActorDetail />} />
                                <Route path="/detail/:id" element={<MovieDetail isLogined={isLogined} />} />
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

