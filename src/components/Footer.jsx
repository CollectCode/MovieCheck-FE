import React from 'react';
import '../css/Footer.css';

//Footer Components
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-title">Movie Check</h1>
        <p className="footer-description">
          MOVIECHEHK는 영화 및 콘텐츠에 대한 정보와 리뷰를 제공하는 사이트입니다.<br/>
          관객의 다양한 스포일러가 포함될 수 있으니, 시청 전에 참고하시기 바랍니다.<br/>
          자주 방문해 주시면 다른 새로운 콘텐츠도 접할 수 있습니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
