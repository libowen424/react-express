const UserModel = require('../find/UserModel')

// update 方法接收2个参数，第一个是查询条件，第二个是修改的值
// 下面把username为lisi的记录，将他的password修改为80
UserModel.update({username:'lisi'},{password:'qwer'}).then((res)=>{
    console.log(res)
})
/**
 * (node:27668) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
 * { n: 1, nModified: 1, ok: 1 }
 * 
 * updateOne 如果查询到多条结果，只更新第一条记录。 upateMany 更新查询到的所有结果。 bulkWrite 提供可控执行顺序的批量写操作。
 */