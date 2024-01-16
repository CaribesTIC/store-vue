import Http from "@/utils/Http";
import type { Movement } from "../types/Movement";

export const getMovements = (query: string, typeId:number=0) => {  
  return Http.get(`/api/movements/${typeId.toString()}?${query}`);
}
 
export const getMovement = (movementId: string) => { 
  return Http.get(`/api/movements/${movementId}`);
}

export const insertMovement = (payload: Movement) => {   
  return Http.post("/api/movements", payload);
}
  
export const updateMovement = (movementId: string, payload: Movement) => {   
  return Http.put(`/api/movements/${movementId}`, payload);
}
  
export const deleteMovement = (movementId: string) => { 
  return Http.delete(`/api/movements/${movementId}`);
}

export const getHelpMovements = () => {
  return Http.get(`/api/movements-help`);
}

export default {
  getMovements,
  getMovement,
  insertMovement,
  updateMovement,
  deleteMovement,
  getHelpMovements
}
