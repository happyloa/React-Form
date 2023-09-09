const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // 將請求代理到Express服務器的地址
      changeOrigin: true,
    })
  );
};
