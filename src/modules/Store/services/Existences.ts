import Http from "@/utils/Http";

export const getExistences = () => {  
  return Http.get(`/api/existences`);
}

export default {
  getExistences
}
