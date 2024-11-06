import React from 'react';

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li className="genrechoice">장 르 선 택</li>
        <li>액션</li>
        <li>범죄/스릴러</li>
        <li>애니메이션</li>
        <li>코미디</li>
        <li>드라마/가족</li>
        <li>판타지</li>
        <li>공포</li>
        <li>전쟁</li>
        <li>로맨스</li>
        <li>SF</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
