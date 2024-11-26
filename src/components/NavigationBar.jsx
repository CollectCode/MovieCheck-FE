import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ setSelectedGenre, selectedGenre }) => {
  const genres = [
    '전체보기', '사용자 추천', '액션', '범죄', '애니메이션', '코미디',
    '드라마', '판타지', '공포', '전쟁', '로맨스', 'SF',
  ];
  const navigate = useNavigate();

  return (
    <nav className="navigation-bar">
      <ul>
        {genres.map((genre) => (
          <li
            key={genre}
            className={`genre ${selectedGenre === genre ? 'selected' : ''}`} // 선택된 장르에 'selected' 클래스 추가
            onClick={() => {
              setSelectedGenre(genre);
              navigate("/", {});
            }}
          >
            {genre}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
