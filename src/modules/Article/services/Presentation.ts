import Http from "@/utils/Http";
// import type { ArticleDetail } from "../types/Article/ArticleDetail";

export const getPresentations = (query: string) => {
  console.log(query)
  console.log(`/api/presentations/?${query}`)
  //return alert("Http.get(`/api/presentations/?${query}`);")
}

export default {
  getPresentations
}
