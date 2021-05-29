var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//cors的中间件
var cors=require("cors");
//解析请求body部分的中间件
var bodyParser = require('body-parser')
//解析formdata
var FormData = require('form-data')
//解析文件
var formidable = require('formidable')
var RoleModel = require('./model/mongooseModel/RoleModel')
var UserModel = require('./model/mongooseModel/UserModel')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roleRouter = require('./routes/role');
var fileRouter = require('./routes/file');

var app = express();
//跨域
app.use(cors()); 
//解析body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/role',roleRouter);
app.use('/file',fileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

RoleModel.findOne({name:'admin'}).then(role=>{
  //不存在admin角色
  if(!role)
  {
    //创建admin角色
     RoleModel.create({name:'admin',menus:['/home','/user','/role'],authName:'',authTime:''}).then(role =>{

        UserModel.findOne({username:'admin'}).then(user=>{
          //不存在admin用户
          if(!user)
          {
            //创建用户
            UserModel.create({username:'admin',password:'admin',roleId:role._id}).then(user =>{
                console.log("初始化超级用户admin",user)
            })
          }
          //存在admin用户
          else
          {
            //更新role
            UserModel.updateOne({_id:user._id},{roleId:role._id}).then((user)=>{
              console.log("初始化超级用户admin",user)
          })
          }
        })
      })
  }
  //存在admin角色
  else{
    UserModel.findOne({username:'admin'}).then(user=>{
      //不存在admin用户
      if(!user)
      {
        //创建用户
        UserModel.create({username:'admin',password:'admin',roleId:role._id}).then(user =>{
            console.log("初始化超级用户admin",user)
        })
      }
      //存在admin用户
      else
      {
        //更新role
        UserModel.updateOne({_id:user._id},{roleId:role._id}).then((user)=>{
          console.log("初始化超级用户admin",user)
      })
      }
    })
  }
})


module.exports = app;
