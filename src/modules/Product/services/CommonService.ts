import Http from "@/utils/Http";

export const getMeasureUnitTypes = () => {  
  return Http.get(`/api/common/measure-unit/type`);
}

export const getMeasureUnits = (measureUnitTypeId: string) => { 
  return Http.get(`/api/common/measure-unit/${measureUnitTypeId}`);
}

export default { }



