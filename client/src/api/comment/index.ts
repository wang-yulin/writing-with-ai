import myRequest from "@/service";
import type * as Model from "./types/model";

export function createFeedbackApi(params: Model.CreateRequestData) {
  return myRequest.request<string>({
    url: "/comment/create",
    method: "post",
    data: params,
  });
}
