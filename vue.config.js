module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://h5.ele.me',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}