const { createProxyMiddleware } = require('http-proxy-middleware');
// We set up proxy to avoid the CORS.We need to changne homepage to published site in package.json to be able to use the proxy.
// target is the base url
// IF we get some problems,refer to package.json's proxy and homePage field to add values.
module.exports = (app) => {
  // app.use(
  //   createProxyMiddleware('/match', {
  //     target: 'http://api.cup2022.ir/api/v1',
  //     changeOrigin: true,
  //   })
  // );
};
