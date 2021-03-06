/**
 * 通过mongoose进行数据插入操作的测试文件
 */
 let mongoose = require('mongoose');
// 导入连接模块
let connection = require('../../connection');
// 创建schema
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    roleId:String
},
//是否添加__v字段，指示的是版本号
{versionKey: false}
)
//通过connection和schema创建model
let UserModel = connection.model('users',UserSchema)


module.exports = UserModel 