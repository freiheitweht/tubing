import axios from 'axios';
import apiList from './apiList';
import qs from 'qs';
import {
  Loading,
  Message
} from 'element-ui'
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}
var loadinginstace
axios.interceptors.request.use(config => { 
  loadinginstace = Loading.service({
    fullscreen: true
  }); 
  return config
}, error => { 
  loadinginstace.close(); 
  Message.error({ 
    message: '加载超时' 
  }); 
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  loadinginstace.close()
  return data
}, error => { 
  loadinginstace.close(); 
  Message.error({ 
    message: '加载失败' 
  }); 
  return Promise.reject(error)
})
let api = {};
let post = (url, data = {}) => {
  return axios.post(url, qs.stringify(data));
};
let postfile = (url, data = {}) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
let get = (url, data = {}) => {
  return axios.get(url, {
    params: data
  });
}
for (let key in apiList) {
  if (apiList[key].method == "POST") {
    api[key] = (data = {}) => {
      return post(apiList[key].url, data);
    }
  } else if (apiList[key].method == "GET") {
    api[key] = (data = {}) => {
      return get(apiList[key].url, data);
    }
  } else if (apiList[key].method == "FILE") {
    api[key] = apiList[key].url;
    // api[key] = (data = {}) => {
    //   return apiList[key].url
    // }
  }
}
export default {
  ...api
}
