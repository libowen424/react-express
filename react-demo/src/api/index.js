import ajax from './ajax'

/**
 * 封装接口
 */

const BASE = '/api1'
const expressIpBase = 'http://localhost:3000'
const javaIpBase = 'http://81.68.67.68:11112'

export const login = (data)=>{
   return ajax(expressIpBase+'/users/login',data,'POST')
}

export const regist = (data)=>{
    return ajax(expressIpBase+ '/users/regist',data,'POST')
}
export const reqRoles = ()=>{
    return ajax(expressIpBase+'/role/getAll',null,'POST')
}

export const addRole = (roleName)=>{
    return ajax(expressIpBase+'/role/add',{name:roleName},'POST')
}

export const updateRole = (role)=>{
    return ajax(expressIpBase+'/role/update',role,'POST')
}

export const getRoleById = (roleId)=>{
    return ajax(expressIpBase+'/role/getById',{_id:roleId},'POST')
}
export const getAllUsers = ()=>{
    return ajax(expressIpBase+'/users/getAll',null,'POST')
}

export const deleteUser = (_id)=>{
    return ajax(expressIpBase+'/users/delete',{_id:_id},'POST')
}

export const addUser = (user)=>{
    return ajax(expressIpBase+'/users/regist',user,'POST')
}

export const updateUser = (user)=>{
    return ajax(expressIpBase+'/users/update',user,'POST')
}

export const AppointOrderInterface = (addrNo,courierName,courierTel,integration,isClassified,items,orderId,orderStatus,senderAddress,senderDateBegin,senderDateEnd,
    senderName,senderRemark,senderTel,senderUrgent,senderWeight,time,userId,type)=>{
    let url,method
    switch(type)
    {
        case 'getAll':
            url='/api/sys/core/appointorder/filter/list'
            method='POST'
            break;
        case 'update':
            url='/api/sys/core/appointorder/saveorupdate'
            method='POST'
            break;
    }
    return ajax(javaIpBase+url,{addrNo,courierName,courierTel,integration,isClassified,items,orderId,orderStatus,senderAddress,senderDateBegin,senderDateEnd,
        senderName,senderRemark,senderTel,senderUrgent,senderWeight,time,userId},method)
}

export const UserInterface = (imageUrl,integration,nickname,openId,orderNum,sessionKey,trashWeight,userId,type)=>{

    let url,method
    switch(type)
    {
        case 'add':
            url="/api/sys/core/user/add"
            method='POST'
            break;
        case 'update':
            url="/api/sys/core/user/saveorupdate"
            method='POST'
            break;
        case 'get':
            url=`/api/sys/core/user/sample?id=${userId}`
            method='GET'
            break
    }
    return ajax(
        javaIpBase+url,
      {
        imageUrl,
        integration,
        nickname,
        openId
        ,orderNum,sessionKey,
        trashWeight,
        userId      
      },
      method
    )
}

export const DeliverOrderInterface = (addrNo,category,feedback,integration,orderId,orderStatus,place,time,userId,weight,type,bucketId)=>{
    let url,method
    switch(type)
    {
        case 'add':         
            url="/api/sys/core/deliverorder/add"
            method='POST'
            break;
        case 'getAll':
            url='/api/sys/core/deliverorder/filter/list'
            method='POST'
            break;
        case 'update':
            url='/api/sys/core/deliverorder/saveorupdate'
            method='POST'
            break;
        case 'getByOrderId':
            url=`/api/sys/core/deliverorder/sample?id=${orderId}`
            method='GET'
            break
    }
    return ajax(javaIpBase+url,{addrNo,category,feedback,integration,orderId,orderStatus,place,time,userId,weight,bucketId},method)
}