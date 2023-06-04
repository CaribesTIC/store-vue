import Http from "@/utils/Http";
import type { Presentation } from "../types/Presentation";

export const getPresentations = (productId: string) => {  
  return Http.get(`/api/presentations/${productId}`);
}

export const insertPresentation = (payload: Presentation) => {   
  return Http.post(`/api/presentations`, payload);
}

export const updatePresentation = (payload: Presentation, presentationId: string) => {   
  return Http.put(`/api/presentations/${presentationId}`, payload);
}

export const deletePresentation = (presentationId: string) => { 
  return Http.delete(`/api/presentations/${presentationId}`);
}

export default {
  getPresentations,
  insertPresentation,
  updatePresentation,
  deletePresentation
}
