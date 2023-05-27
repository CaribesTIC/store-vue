import Http from "@/utils/Http";
import type { Presentation } from "../types/Presentation";

export const getPresentations = (query: string) => {  
  return Http.get(`/api/presentations/?${query}`);
}

export const getPresentation = (presentationId: string) => { 
  return Http.get(`/api/presentations/${presentationId}`);
}

export const insertPresentation = (payload: any) => {   
  return Http.post(`/api/presentations`, payload);
}

export const updatePresentation = (presentationId: string, payload:any) => {   
  return Http.put(`/api/presentations/${presentationId}`, payload);
}

export const deletePresentation = (presentationId: string) => { 
  return Http.delete(`/api/presentations/${presentationId}`);
}

export default {
  getPresentations,
  getPresentation,
  insertPresentation,
  updatePresentation,
  deletePresentation
}
