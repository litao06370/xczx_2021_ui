//public是对axios的工具类封装，定义了http请求方法
// import http from './../../../base/api/public'
//这里的导入也可以使用下面的形式
import http from '@/base/api/public'
//导入querystring工具组件，querystring在package-lock.json已配置
import querystring from 'querystring'

//导入标识前缀的统一配置文件sysConfig.js
// import sysConfig from '@/../config/sysConfig'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;//调用前缀的标识


//编写调用微服务的接口地址，并将方法通过export const进行导出，提供给外部使用
export const page_list = (page,size,param) => {
  //将jason对象转化成key value对
  let query = querystring.stringify(param);
  //对微服务的地址修改，添加调用前缀的标识
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size + '/?' + query)
  }
