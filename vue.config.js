const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
const px2rem = require('postcss-px2rem')

const postcss = px2rem({
    remUnit: 75   //基准大小 baseSize，需要和rem.js中相同
})
module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        port: 3000,
        proxy:{
            '/4000': {
                target: 'http://localhost:4000',
                changeOrigin: true, //允许跨域
                pathRewrite:{
                    "^/4000":""
                }
            },
            '': {
                target: 'https://m.you.163.com/xhr',
                changeOrigin: true, //允许跨域
                pathRewrite:{
                    "":""
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages'),
                'store': resolve('src/store')
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    }
}