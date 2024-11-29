
import Http from "@/utils/Http";
//import type { Movement, MovementTypeId } from "../types/Movement";

export const getDailyClosings = () => {  
  return Http.get(`/api/daily-closings`);
}

export const getPreDailyClosings = () => {
  return Http.get('/api/daily-closings/pre');
}

export const setDailyClosings = (payload) => {  
  return Http.post(`/api/daily-closings`, payload);
}

export default {
  getDailyClosings,
  getPreDailyClosings,
  setDailyClosings
}
