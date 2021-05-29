通过nodemon来启动，可以动态更新

通过mongodb模块连接数据库,mode文件夹封装数据库操作





部署的时候一直报错，原来是缺少views/error.html的问题

```js
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);
```

加上这些代码，并在views文件夹下新建error.html





**注意：**一定要在数据库中初始化admin用户和ta对应的权限，否则一开始登录不了





为了使用未配置跨域的后端服务，决定用这个express搭建一个请求转发

参考：https://juejin.cn/post/6864469655205969928

