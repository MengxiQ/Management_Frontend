module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',//这个指向服务端api
        ws: true,
        changeOrigin: true
      }

    }
  }
}