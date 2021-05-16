const {createProxyMiddleware} = require('http-proxy-middleware');


module.exports = function(app){
	app.use(
		createProxyMiddleware('/api1',{ //遇见/api1前缀的请求，就会触发该代理配置
			target:'http://localhost:3000', //请求转发给谁
			changeOrigin:true,//控制服务器收到的请求头中Host的值
                     /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：服务器的
         	changeOrigin设置为false时，服务器收到的请求头中的host为：本web的
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
			pathRewrite:{'^/api1':''} //重写请求路径(必须)
		}),
	)
}