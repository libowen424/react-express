var express = require('express');
var router = express.Router();
// var model = require('../model');
var UserModel = require('../model/mongooseModel/UserModel')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // res.json({
  //   code:200,
  //   data:{'name':'aa','age':18}
  // })
});

//注册接口
router.post('/regist',function(req,res,next){
  var data = {
    username:req.body.username,
    password:req.body.password,
    roleId:req.body.roleId
  }
  /**
   * 数据验证
  */

  /**
   * 对数据库进行操作
   */
  // model.connect(function(db){
  //   db.collection('users').insertOne(data,function(err,ret)
  //   {
  //     if(err){
  //       res.send(err)
  //     }else
  //     {
  //       res.json({
  //         code:200,
  //         data:data
  //       })
  //     }
  //   })
  // })

  UserModel.findOne({username:data.username}).then(user=>{
    if(!user)
    {
        UserModel.create(data).then(user =>{
            console.log("创建用户",user.username)
            res.json({
              code:200,
              data:data
            })
        },
        err=>{
          console.log("创建用户失败")
          res.send(err)
        })
    }
    else
    {
      res.json({
        code:700,
        err:"用户已存在"
      })
    }
})
})

/**
 * 登录接口
 */
 router.post('/login',function(req,res,next){
  //  console.log('req',req.body)
  var data = {
    username:req.body.username,
    password:req.body.password
  }
  /**
   * 数据验证
  */

  /**
   * 对数据库进行操作
   */
  // model.connect(function(db){
  //   db.collection('users').findOne(data,function(err,ret)
  //   {
  //     if(err){
  //       console.log(err)
  //     }else
  //     {
  //       console.log(ret)
  //     }
  //   })
  // })

  UserModel.find(data).then(user=>{
    // console.log(data)
    console.log(user)
    if(user.length!=0)
    {
      res.json({
        code:200,
        data:user[0]
      })
    }
    else
    {
      res.json({
        code:700,
        err:"不存在该用户，登陆失败"
      })
    }
  },
  err=>{
    res.send(err)
  })
})


router.post('/auth',function(req,res,next){
  //  console.log('req',req.body)
  var data = {
    userId:req.body.userId,
    roleId:req.body.roleId
  }
  console.log(data)
  UserModel.updateOne({_id:data.userId},{roleId:data.roleId}).then((result)=>{
    // console.log(res)
    res.json({
      code:200,
      data:data
    })
  },(err)=>{
    // console.log(err)
  })
})

router.post('/getAll',function(req,res,next){

  UserModel.find({}).then((users)=>{
    console.log(users)
    res.json({
      code:200,
      data:users
    })
  },(err)=>{
    // console.log(err)
  })
})

router.post('/delete',function(req,res,next){
  const _id = req.body._id
  console.log(_id)
  UserModel.deleteOne({_id:_id}).then((user)=>{
    // console.log(users)
    res.json({
      code:200,
      data:user
    })
  },(err)=>{
    console.log(err)
  })
})


router.post('/update',function(req,res,next){
  var data = req.body
  UserModel.updateOne({_id:data._id},{username:data.username,password:data.password,roleId:data.roleId}).then((user)=>{
      // console.log(role)
      console.log(data) 
      res.json({
          code:200,
          data:user
      })
  })
})

module.exports = router;
