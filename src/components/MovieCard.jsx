import React from 'react';
import { Link } from 'react-router-dom';

// MovieCard components
const MovieCard = ({ id, title, poster }) => {
  return (
    <div className="movie-card">
      <Link to={`/detail/${id}`} state={{ id: id, poster: poster, title: title }} className='link-container' style={{ textDecoration:"none" }}>
        <img src={poster} alt={title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;
