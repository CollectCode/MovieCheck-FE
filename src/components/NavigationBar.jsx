import React from 'react';

const NavigationBar = ({ setSelectedGenre }) => {
  const genres = [
    '추천', '액션', '범죄', '애니메이션', '코미디',
    '드라마', '판타지', '공포', '전쟁', '로맨스', 'SF',
  ];

  return (
    <nav className="navigation-bar">
      <ul>
        <li className="genrechoice">장 르 선 택</li>
        {genres.map((genre) => (
          <li
            key={genre}
            className="genre"
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
