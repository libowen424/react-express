/**
 * 通过mongoose进行数据插入操作的测试文件
 */
 let mongoose = require('mongoose');
// 导入连接模块
let connection = require('../../connection');
// 创建schema
let RoleSchema = new mongoose.Schema({
    id:String,
    name:String,
    authTime:String,
    authName:String,
    menus:Array 
},
//是否添加__v字段，指示的是版本号
{versionKey: false}
)
//通过connection和schema创建model
let RoleModel = connection.model('role',RoleSchema)

RoleModel.findOne({name:'admin'}).then(user=>{
    if(!user)
    {
        RoleModel.create({name:'admin',menus:['/home','/user','/role'],authName:'',authTime:''}).then(role =>{
            console.log("初始化超级用户admin")
        })
    }
})
module.exports = RoleModel