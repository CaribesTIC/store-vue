import Http from "@/utils/Http";
import type { Product } from "../types/Product";

export const getProducts = (query: string) => {  
  return Http.get(`/api/products/?${query}`);
}

export const getProduct = (productId: string) => { 
  return Http.get(`/api/products/${productId}`);
}

export const insertProduct = (payload: any) => {   
  return Http.post(`/api/products`, payload);
}

export const updateProduct = (productId: string, payload:any) => {   
  return Http.put(`/api/products/${productId}`, payload);
}

export const deleteProduct = (productId: string) => { 
  return Http.delete(`/api/products/${productId}`);
}

export default {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct
}
