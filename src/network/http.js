import axios from "axios";

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2axios拦截器
  ////2.1 添加请求拦截器
  instance.interceptors.request.use(function(config){
    return config
  },function(error){
    console.log(error)
  })
  ////2.2 添加响应拦截器
  instance.interceptors.response.use(function(response){
    
    return response
  },function(error){
    console.log(error)
  })
  //3.发送真正的请求
  return instance(config)
}
