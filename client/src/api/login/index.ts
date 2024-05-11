import myRequest from "@/service";
import type * as Login from "./types/login";

export function loginApi(params: Login.LoginRequestData) {
  return myRequest.request<{
    tokens: { accessToken: string; refreshToken: string };
    user: { _id: string };
  }>({
    url: "/login/basic",
    method: "post",
    data: params,
  });
}
