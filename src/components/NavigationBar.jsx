import React from 'react';
import '../css/NavigationBar.css'; // 스타일 시트

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>한국 영화</li>
        <li>외국 영화</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
