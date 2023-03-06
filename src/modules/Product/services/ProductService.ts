import Http from "@/utils/Http";

export const getProducts = (query: string) => {  
  return Http.get(`/api/products/?${query}`);
}

export const getProduct = (productId: string) => { 
  return Http.get(`/api/products/${productId}`);
}

export const insertProduct = (payload: any) => {
  console.log(payload) 
  alert("return Http.post(`/api/products`, payload);")
}

export const updateProduct = (payload:any, productId: string) => {
  console.log(payload, productId) 
  alert("return Http.put(`/api/products/${productId}`, payload);")
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
