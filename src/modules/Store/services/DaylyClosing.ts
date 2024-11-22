
import Http from "@/utils/Http";
//import type { Movement, MovementTypeId } from "../types/Movement";

export const getDailyClosings = () => {  
  return Http.get(`/api/daily-closings`);
}


export default {
  getDailyClosings
}

