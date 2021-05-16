const UserModel = require('../find/UserModel')

// delete 方法接收1个参数，就是查询条件
// 下面把name为lisi的记录删除
UserModel.remove({username:'lisi'}).then((res)=>{
    console.log(res)
})

//remove 删除查询到所有结果，方法已经不提倡使用，已被deleteMany替代。 deleteOne如果查询到多条结果，只删除第一条记录。 deleteMany 删除查询到所有结果。 bulkWrite 提供可控执行顺序的批量写操作。