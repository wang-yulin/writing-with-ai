import axios from "axios";
import type { AxiosInstance } from "axios";
import { MyRequestConfig, MyRequestInterceptors } from "./type";
import { getToken } from "@/tools/auth";
import { merge } from "lodash-es";

class MyRequest {
  instance: AxiosInstance;
  interceptors?: MyRequestInterceptors;
  // showLoading: boolean;

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.intercepters;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~, 错误信息");
        } else {
          return data;
        }
      },
      (err) => {
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
        return err;
      }
    );
  }

  request<T>(config: MyRequestConfig): Promise<ApiResponseData<T>> {
    const defaultConfig = {};
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config);
    return this.instance(mergeConfig);
  }
}

export default MyRequest;
