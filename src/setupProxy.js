const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Specifies that any requests starting with '/api' should be proxied
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Removes '/api' prefix when forwarding to the backend
    })
  );
};
