import Http from "@/utils/Http";

export const getProducts = (query: string) => {  
  return Http.get(`/api/products/?${query}`);
}

export const getProduct = (productId: string) => { 
  return Http.get(`/api/products/${productId}`);
}

export const insertProduct = (payload) => {  
  return Http.post(`/api/users`, payload);
}

export const updateProduct = (userId: string, payload:any) => { 
  return Http.put(`/api/users/${userId}`, payload);
}

export const deleteProduct = (userId: string) => { 
  return Http.delete(`/api/users/${userId}`);
}

export default {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct
}
