import axios from 'axios'
import {message} from 'antd'

/**
 * 封装ajax请求，返回的是一个promise对象
 */
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve, reject) => {
        let promise
    switch(type)
    {
        case 'GET':
            promise =  axios.get(url,{
                params:data
            })
            break;
        case 'POST':
            promise = axios.post(url,data)
            break;
    }
    promise.then(response => {
        resolve(response)
      // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
      }).catch(error => {
        // reject(error)
        message.error('请求出错了: ' + error.message)
      })
})
}