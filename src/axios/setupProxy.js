// # main/frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// "/api" 경로가 시작하면 ProxyMiddleware를 실행한다.
module.exports = function(app)  {
    app.use(
        createProxyMiddleware({
            target : 'http://localhost:8080',
            changeOrigin: true, 
            pathFilter : '/api', // 문법 변경으로 인해 createProxyMiddleware안에 pathFilter로 지정해줘야함
        })
    )
}