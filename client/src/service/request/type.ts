import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface MyRequestInterceptors {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorCatch?: (error: any) => any;
}

export interface MyRequestConfig extends AxiosRequestConfig {
  intercepters?: MyRequestInterceptors;
}
