import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import MovieDetail from './pages/MovieDetail';
import './App.css'; // 스타일 시트

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
          </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
