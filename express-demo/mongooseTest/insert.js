/**
 * 通过mongoose进行数据插入操作的测试文件
 */
/**
 * 
    schema: 在 mongoose 中，所有的东西都来源于一个 schema，每个schema 映射了一个 MongoDB 的集合，它定义了这个集合中的文档的骨架。
    model: 一个文件的构造器，通过编译schema得到，一个model的实例就是一个文件，model负责从 MongoDB 数据库中创建和读取文档。
 */
let mongoose = require('mongoose');
// 导入连接模块
let connection = require('../connection');
// 创建schema
let UserSchema = new mongoose.Schema({
    username:String,
    password:String
},
//是否添加__v字段，指示的是版本号
{versionKey: false}
)
//通过connection和schema创建model
let UserModel = connection.model('users',UserSchema)
//通过实例化model创建文档
let userDoc = new UserModel({
    username:'zhangsan',
    password:20
})
userDoc.save().then((doc)=>{
    console.log(doc)
})

/**
 * 或者还可以直接通过Model的create方法直接插入数据，返回的也是一个Promise：
 * 
 * 
 */
//  UserModel.create({
//     username: 'lisi',
//     password: '19'
// }).then((doc) => {
//     console.log(doc)
// })