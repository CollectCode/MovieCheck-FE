import React from 'react';
import { Link } from 'react-router-dom';

// MovieCard components
const MovieCard = ({ key, title, poster }) => {
  return (
    <div className="movie-card">
      <Link to="/detail/${key}" state={{ id : key, poster : poster, title : title }}>
        <img src={poster} alt={title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;
