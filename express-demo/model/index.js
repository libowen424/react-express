/**
 * 通过mongodb库原生连接
 */

var MongoCloent = require('mongodb')

var url = 'mongodb://localhost:27017'
var dbName = 'blogSystemProject'

//数据库连接方法
function connect(callback){
    MongoCloent.MongoClient.connect(url,function(err,client)
    {
        if(err)
        {
            console.log("数据库连接错误",err)
        }
        else{
            var db = client.db(dbName)
            callback(db)
            client.close()
        }
    })
}

module.exports = 
{
    connect
}