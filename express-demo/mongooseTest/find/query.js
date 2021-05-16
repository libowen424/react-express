const UserModel = require('./UserModel')

UserModel.find({username:'lisi',password:'19'}).then(doc=>{
    console.log(doc)
})