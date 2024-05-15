import myRequest from "@/service";
import type * as Article from "./types/article";

export function createApi(params: Article.Article) {
  return myRequest.request({
    url: "/article/create",
    method: "post",
    data: params,
  });
}

export function getAllArticlesApi() {
  return myRequest.request<Article.Article[]>({
    url: "/article/all",
    method: "get",
  });
}

export function getArticleByIdApi(id: string) {
  return myRequest.request<Article.Article>({
    url: `/article/id/${id}`,
    method: "get",
  });
}

export function updateArticleApi(article: Article.Article) {
  return myRequest.request<Article.Article>({
    url: "/article/update",
    method: "post",
    data: article,
  });
}
