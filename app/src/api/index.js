import axios from 'axios';
import apiList from './apiList';
import qs from 'qs';
axios.defaults.headers = {
  "Content-Type":"application/x-www-form-urlencoded"
}
let api = {};

let post = (url, data = {}) => {
  return axios.post(url, qs.stringify(data));
};
let get = (url, data = {}) => {
  return axios.get(url,{params:data});
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
  }
}
export default {
  ...api
}
