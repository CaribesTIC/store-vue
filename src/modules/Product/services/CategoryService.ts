import Http from "@/utils/Http";

export const getCategories = () => {  
  return Http.get("/api/category/get/list");
}
  
export const getCategoriesChildren = (menuId) => {
  return Http.get(`/api/category/get/nivel/${menuId}`);
}

export const getCategoriesSelect = () => {  
  return Http.get("/api/category/get/select");
}

export const insertCategory = (form) => {  
  return Http.post(`/api/category/regist`, form);
}

//export const updateCategory = (menuId, form) => {
export const updateCategory = (form) => {
  // return Http.put(`/api/category/${menuId}`, form);
  return Http.post(`/api/category/regist`, form);
}

export const deleteCategory = (id) => {  
  return Http.delete(`/api/category/remove/${id}`);
}




