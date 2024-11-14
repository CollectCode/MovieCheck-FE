import React ,{ useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import axios from 'axios';

const App = (nickName) => {
  const [isLogined, setIsLogined] = useState('');

  useEffect(() => {
    setIsLogined(!!document.cookie);
  });

  return (
    <Router>
      <div className="app">
        {!!isLogined ? <LoginedHeader setIsLogined={setIsLogined} nickName={nickName}/> : <UnLoginedHeader />}
        <div className="container">
          <NavigationBar />
          <div className="main-content">
          <Routes>
            <Route path="/" element={<MovieGrid />}/>
            <Route path="/detail/:id" element={<MovieDetail />}></Route>
            <Route path="/login" element={<LoginForm setIsLogined={setIsLogined}/>}></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profileupdate" element={<ProfileUpdate />}></Route>
          </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
