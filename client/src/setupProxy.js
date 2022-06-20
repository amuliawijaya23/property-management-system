const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: `${process.env.REACT_APP_API}`,
  changeOrigin: true,
  pathRewrite: {
    '^/app' : '/'
  }
};

module.exports = (App) => {

  App.use(
    '/app',
    createProxyMiddleware(proxy)
  );
};