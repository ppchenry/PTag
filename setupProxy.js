const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/php',
        createProxyMiddleware({
            target: 'https://uat.ptag.com.hk',
            changeOrigin: true,
        })
    );
};