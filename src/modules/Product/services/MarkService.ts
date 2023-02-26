import Http from "@/utils/Http";

export const getMarks = (query: string) => {  
  return Http.get(`/api/marks/?${query}`);
}

export const getMarksSelect = () => {  
  return Http.get(`/api/marks/list`);
}

export const getMark = (markId: string) => { 
  return Http.get(`/api/marks/${markId}`);
}

export const insertMark = (payload) => {  
  return Http.post(`/api/marks`, payload);
}

export const updateMark = (markId: string, payload:any) => { 
  return Http.put(`/api/marks/${markId}`, payload);
}

export const deleteMark = (markId: string) => { 
  return Http.delete(`/api/marks/${markId}`);
}

export default {
  getMarks,
  getMark,
  insertMark,
  updateMark,
  deleteMark
}

