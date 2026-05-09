const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/api/emailjs',
    createProxyMiddleware({
      target: 'https://api.emailjs.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/emailjs': '/api/v1.0/email',
      },
    })
  );
};
