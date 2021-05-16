import ajax from './ajax'

/**
 * 封装接口
 */

const BASE = '/api1'
const productionBASE = 'http://localhost:3000'

export const login = (data)=>{
   return ajax(productionBASE+'/users/login',data,'POST')
}

export const regist = (data)=>{
    return ajax(productionBASE+ '/users/regist',data,'POST')
}
export const reqRoles = ()=>{
    return ajax(productionBASE+'/role/getAll',null,'POST')
}

export const addRole = (roleName)=>{
    return ajax(productionBASE+'/role/add',{name:roleName},'POST')
}

export const updateRole = (role)=>{
    return ajax(productionBASE+'/role/update',role,'POST')
}

export const getRoleById = (roleId)=>{
    return ajax(productionBASE+'/role/getById',{_id:roleId},'POST')
}
export const getAllUsers = ()=>{
    return ajax(productionBASE+'/users/getAll',null,'POST')
}

export const deleteUser = (_id)=>{
    return ajax(productionBASE+'/users/delete',{_id:_id},'POST')
}

export const addUser = (user)=>{
    return ajax(productionBASE+'/users/regist',user,'POST')
}

export const updateUser = (user)=>{
    return ajax(productionBASE+'/users/update',user,'POST')
}