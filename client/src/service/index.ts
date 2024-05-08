import MyRequest from "./request";

const myRequest = new MyRequest({
  baseURL: "http://localhost:3001",
  timeout: 100000,
});

export default myRequest;
