import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import './App.css'; // 스타일 시트

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <NavigationBar />
          <div className="main-content">
            <SearchBar />
            <MovieGrid />
            <Pagination />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
