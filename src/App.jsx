import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import MovieGrid from './pages/MovieGrid';
import Footer from './components/Footer';
import MovieDetail from './pages/MovieDetail';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <NavigationBar />
          <div className="main-content">
          <Routes>
            <Route path="/" element={<MovieGrid />}/>
            <Route path="/detail/:id" element={<MovieDetail />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
          </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
