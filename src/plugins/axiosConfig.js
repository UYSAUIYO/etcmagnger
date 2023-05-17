import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 9000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Methods": "PUT,POST.GET,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "X-Powered-By": " 3.2.1",
  },
});
export function get(url, params) {
  return instance.get(url, {
    params: params,
  });
}

// 封装POST请求
export function post(url, data) {
  return instance.post(url, data);
}

// 封装PUT请求
export function put(url, data) {
  return instance.put(url, data);
}

// 封装DELETE请求
export function del(url) {
  return instance.delete(url);
}
