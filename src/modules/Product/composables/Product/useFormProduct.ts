import { onMounted, reactive, ref, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import * as CategoryService from "@/modules/Product/services/CategoryService";
import * as MarkService from "@/modules/Product/services/MarkService";
import * as CommonService from "@/modules/Product/services/CommonService";

export default (product: Product) => {
  const router = useRouter();
  
  const categories = ref<Category[]>([])
  const marks = ref<Mark[]>([])
  const measureUnitTypes = ref<measureUnitType[]>([])
  const measureUnits = ref<measureUnit>([])
  
  const form = reactive({
    category_id: product.category_id,
    mark_id: product.mark_id,
    measure_unit_type_id: product.measure_unit_type_id,
    measure_unit_id: product.measure_unit_id,
    name: product.name
  })

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(() => {
    pending.value = true
    CategoryService.getCategoriesSelect()
      .then((response) => {
        categories.value = response.data.map(function(c) {
          return {
            id: c.id,
            name: c.family
          }
        }).sort(function (a, b) {
          if (a.name > b.name) { return  1; }
          if (a.name < b.name) { return -1; }
          // a must be equal to b
          return 0;
        })
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
    
    pending.value = true
    MarkService.getMarksSelect()
      .then((response) => {         
         marks.value =   response.data
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    CommonService.getMeasureUnitTypes()
     .then((response) => {
        measureUnitTypes.value = response.data.map(function(mut) {
          return {
            id: mut.id,
            name: mut.description
          }
        }).sort(function (a, b) {
          if (a.name > b.name) { return  1; }
          if (a.name < b.name) { return -1; }
          // a must be equal to b
          return 0;
        })
      })
      .catch((err) => {        
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })

      if (product.measure_unit_type_id)
        getMeasureUnits(product.measure_unit_type_id)
  })
  
  const getMeasureUnits = async (measureUnitTypeId) => {    
    pending.value = true
      CommonService.getMeasureUnits(measureUnitTypeId)
        .then((response) => {          
          measureUnits.value = response.data.map(function(mu) {
            return {
              id: mu.id,
              name: mu.description
            }
          }).sort(function (a, b) {
            if (a.name > b.name) { return  1; }
            if (a.name < b.name) { return -1; }
            // a must be equal to b
            return 0;
          })
          if (!measureUnits.value.some(item => item.id === form.measure_unit_id)) {
            form.measure_unit_id = ""
          }                    
      })
      .catch((err) => {        
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })
  }


  
  /*const submit = (product: Product) => {
    !productId ? insertProduct (product)  : updateProduct(product, productId)
  }*/

  const initMeasureUnits = () => {
    form.measure_unit_id = ""
    measureUnits.value = []
  }

  watch(
    () => form.measure_unit_type_id,
    (newMeasureUnitType, oldMeasureUnitType) => {        
      newMeasureUnitType === ""
        ? initMeasureUnits()
          : getMeasureUnits(form.measure_unit_type_id)
    },
    { immediate: false, deep: true },
  )

  return {
    categories,
    form,
    marks,
    measureUnitTypes,
    measureUnits,
    errors,
    pending,

    //submit    
  }

}
