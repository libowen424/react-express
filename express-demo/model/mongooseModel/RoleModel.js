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


module.exports = RoleModel