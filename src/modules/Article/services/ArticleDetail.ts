import Http from "@/utils/Http";
import type { ArticleDetail } from "../types/Article/ArticleDetail";

export const getArticleDetails = (articleId: string) => {  
  return Http.get(`/api/article_details/${articleId}`);
}

export const registerArticleDetail = (payload: ArticleDetail[]) => {
  return Http.post(`/api/article_details`, payload);
}

export const deleteArticleDetail = (articleDetailId: string) => {
  return Http.delete(`/api/article_details/${articleDetailId}`);
}

export default {
  getArticleDetails,
  registerArticleDetail,
  deleteArticleDetail
}
