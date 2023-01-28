import Http from "@/utils/Http";

export const getMarks = () => {  
  return Http.get("/api/marks/?${query}");
}

export const getMark = (markId: string) => { 
  return Http.get(`/api/marks/${markId}`);
}


export const insertMark = () => {  
  return null;
}

export const updateMark = () => {  
  return null;
}

export default {
  getMarks,
  insertMark,
  updateMark
}

/*export default {

  getProduct(userId) {
    return Http.get(`/api/users/${userId}`);
  },      
  getProducts(query) {  
    return Http.get(`/api/users/?${query}`);
  },  
  //paginateProducts(link) {
  //  return Http.get(link);
  //},
  insertProduct(form) {
    return Http.post(`/api/users`, form);
  },
  updateProduct(userId, form) {
    return Http.post(`/api/users/${userId}`, form);
  },
  deleteProduct(userId) {
    return Http.delete(`/api/users/${userId}`);
  },
  helperTablesGet() {
     return Http.get(`/api/roles/helperTables`);
  },
};*/
