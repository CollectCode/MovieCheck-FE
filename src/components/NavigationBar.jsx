import React from 'react';

// Navigation Components
const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li className="genrechoice">장 르 선 택</li>
        <li className="genre">액션</li>
        <li className="genre">범죄</li>
        <li className="genre">애니메이션</li>
        <li className="genre">코미디</li>
        <li className="genre">드라마</li>
        <li className="genre">판타지</li>
        <li className="genre">공포</li>
        <li className="genre">전쟁</li>
        <li className="genre">로맨스</li>
        <li className="genre">SF</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
