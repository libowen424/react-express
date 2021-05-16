/**
 * 通过mongoose连接数据库
 */

const mongoose = require('mongoose')
const conn = mongoose.createConnection(
  // 连接地址，MongoDB 的服务端口为27017
  // blogSystemProject是我要使用的数据库名，如果不存在这个数据库
  //当往其中写数据时，MongoDB 会自动创建一个名为dbtest的数据库，不用事先手动创建。
  'mongodb://127.0.0.1:27017/blogSystemProject', 
  // 一些兼容配置，必须加，你不写运行的时候会提示你加。
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
)
conn.on('open', () => {
	console.log('打开 mongodb 连接');
})
conn.on('err', (err) => {
	console.log('err:' + err);
})

module.exports = conn;