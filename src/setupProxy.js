// # main/frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8080',
            changeOrigin: true,
            // 웹팩 서버에서 보내는 요청이 다른 포트로 가기 때문에 설정
            secure: false, 
        })
    );
};