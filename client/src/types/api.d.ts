interface ApiResponseData<T> {
  statusCode: number;
  data: T;
  message: string;
}
