const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://43.203.83.192:8080',
            changeOrigin: true,
            secure: false,
            logLevel: 'debug', // 디버그 활성화
        })
    );
};
