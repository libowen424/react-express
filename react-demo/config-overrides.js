const { override, fixBabelImports, addLessLoader } = require('customize-cra');

 module.exports = override(
    //针对antd实现按需打包
    //根据import来按需
    fixBabelImports('import', {
      libraryName: 'antd',
         libraryDirectory: 'es',
         style: true,
       }),
       //使用less-loader对样式进行覆盖
       addLessLoader({
          lessOptions:{
            javascriptEnabled: true,
            modifyVars: { '@primary-color': 'green' },
        }
       })
     );