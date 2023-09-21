import Http from "@/utils/Http";
import type { ArticleDetail } from "../types/Article/ArticleDetail";

export const getArticleDetails = (articleId: string) => {  
  return Http.get(`/api/article_details/${articleId}`);
}

export const insertArticleDetail = (payload: ArticleDetail) => {   
  return Http.post(`/api/article_details`, payload);
}

export const updateArticleDetail = (payload: ArticleDetail, article_detailId: string) => {   
  return Http.put(`/api/article_details/${article_detailId}`, payload);
}

export const deleteArticleDetail = (article_detailId: string) => { 
  return Http.delete(`/api/article_details/${article_detailId}`);
}

export default {
  getArticleDetails,
  insertArticleDetail,
  updateArticleDetail,
  deleteArticleDetail
}
