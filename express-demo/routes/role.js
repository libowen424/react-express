var express = require('express');
var router = express.Router();
var RoleModel = require('../model/mongooseModel/RoleModel')

router.post('/add',function(req,res,next){
    var data = {
        name:req.body.name,
        authName:req.body.authName,
        authTime:req.body.authTime
    }
    RoleModel.findOne({name:data.name}).then(role=>{
        if(!role)
        {
            RoleModel.create(data).then(role =>{
                console.log("创建用户",role.name)
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
            err:"角色已存在"
          })
        }
    })
})

router.post('/update',function(req,res,next){
    var data = req.body
    RoleModel.updateOne({_id:data._id},{authName:data.authName,authTime:data.authTime,menus:data.menus}).then((role)=>{
        // console.log(role)
        // console.log(data) 
        res.json({
            code:200,
            data:data
        })
    })
})

router.post('/getAll',function(req,res,next){

    RoleModel.find({}).then((roles)=>[
        // console.log(roles)
        res.json({
            code:200,
            data:roles
        })
    ])
})

router.post('/getById',function(req,res,next){
    const _id = req.body._id
    RoleModel.findOne({_id:_id}).then((role)=>[
        // console.log(roles)
        res.json({
            code:200,
            data:role
        })
    ])
})
module.exports = router;
