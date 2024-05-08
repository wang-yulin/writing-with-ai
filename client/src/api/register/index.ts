import myRequest from "@/service";
import type * as Register from "./types/register";

export function registerApi(params: Register.RegisterRequestData) {
  return myRequest.instance.request({
    url: "/signup/basic",
    method: "post",
    data: params,
  });
}
