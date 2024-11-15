import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
  const [isLogined, setIsLogined] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLogined(!!document.cookie);
  });

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={650}>
        <div className="app">
          {!!isLogined ? <LoginedHeader setIsLogined={setIsLogined} /> : <UnLoginedHeader />}
          <div className="container">
            <NavigationBar />
            <div className="main-content">
              <Routes location={location}>
                <Route path="/" element={<MovieGrid />} />
                <Route path="/detail/:id" element={<MovieDetail />} />
                <Route path="/login" element={<LoginForm setIsLogined={setIsLogined} />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/profile" element={<Profile />} />
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
