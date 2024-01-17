import Http from "@/utils/Http";
//import type { MovementDetail } from "../types/Store/MovementDetail";
//import type { MovementDetail } from "../types/Movement";


export const getMovementDetails = (movementId: string) => {  
  return Http.get(`/api/movement_details/${movementId}`);
}

export const insertMovementDetail = (payload: MovementDetail) => {   
  return Http.post(`/api/movement_details`, payload);
}

export const updateMovementDetail = (payload: MovementDetail, movement_detailId: string) => {   
  return Http.put(`/api/movement_details/${movement_detailId}`, payload);
}

export const deleteMovementDetail = (movement_detailId: string) => { 
  return Http.delete(`/api/movement_details/${movement_detailId}`);
}

export default {
  getMovementDetails,
  insertMovementDetail,
  updateMovementDetail,
  deleteMovementDetail
}
