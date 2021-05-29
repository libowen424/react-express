/**
 * 通过express进行请求转发
 */

 var express = require('express');
 var router = express.Router();
 var axios = require('axios')
 var formidable = require('formidable')
 var FormData = require('form-data');
 var fs = require('fs')

 router.get('/getAll',function(req,res,next){
     console.log('req.body',req.body)
     console.log('req.params',req.params)
     console.log('req.query',req.query)//get请求的参数在query里
     const request1 = axios.create({
        timeout: 30000
      })
      request1.get('http://81.68.67.68:11112/trashrecycle/storage/api/sys/storage/file/list?user=core')
      .then(function(response){
            console.log(response.data.data)
            res.json({
                  'code':200,
                  'data':response.data.data.value
            })
      }).catch(err =>{
            res.send('err')
      }).finally(
            console.log('请求结束')
      )
 });

 router.post('/upload',function(req,res,next){
      // console.log('req.body',req.body)
      // console.log('req.params',req.params)
      // console.log('req.query',req.query)
      // 构造form-data
      const formdata = new FormData()
      // 初始化form，用作文件解析
      const form = formidable({ multiples: true });
      form.parse(req,(err, fileds, files) => {
            // console.log('fileds', fileds)
            // console.log('files', files.file.path)
            //  通过fs创建文件的流
            // console.log(files.file.name)
            const stream = fs.createReadStream(files.file.path)
            // 使用formdata的append方法填充内容
            // if (typeof fileds.type !== 'undefined' && fileds.type) {
            //       formdata.append('type', fileds.type)
            // }
            // formdata.append('fileName', fileds.fileName)
            formdata.append('file', stream,files.file.name)
            // formdata.append('fileName', files.file.name)
            console.log(formdata['file'])
            var headers = formdata.getHeaders();//获取headers
            headers["Content-Type"]="multipart/form-data" 
            axios.post(
                  'http://81.68.67.68:11112/trashrecycle/core/api/sys/core/community/image/upload',
                  formdata,
                  {
                   headers
                  }
            ).then(response =>{
                  console.log('成功',response.data.data.value)
                  res.json({
                        code:200,
                        data:response.data.data.value
                  })
            }).catch(err=>{
                  console.log(err);
                  res.json({
                        code:500,
                        err:err
                                    })
         })
            // const request1 = axios.create({
            //       timeout: 30000,
            //       headers:{ "Content-Type": "multipart/form-data" }
            //     })

            // request1.post('http://124.71.236.67/trashrecycle/core/api/sys/core/community/image/upload'
            // , formdata)
            // .then(function (response) {
            //       console.log(response)
            //       res.json({
            //             code:200,
            //             data:response
            //       })
            // }).catch(err => {
            //       res.json({
            //             err:err
            //       })
            // })
          
      })

  });

 module.exports = router;
