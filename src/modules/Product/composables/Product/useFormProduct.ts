import { onMounted, reactive, ref, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
//import * as CategoryService from "@/modules/Product/services/CategoryService";
//import * as MarkService from "@/modules/Product/services/MarkService";
//import * as CommonService from "@/modules/Product/services/CommonService";
//import ProductService from "@/modules/Product/services/ProductService";
//import type User from "../types/User"

export default (product: Product) => {
  const { updateMeasureUnit } = inject<{
    updateMeasureUnit: (val: any) => void;
  }>('measureUnit')
  const router = useRouter();
  
  //const category = ref<Role[]>([])
  //const category = ref([])
  const mark = ref([])
  const measureUnitTypes = ref([])
  const measureUnits = ref([])
  
  const form = reactive({
    category_id: "",
    mark_id: "",
    measure_unit_type_id: "",
    measure_unit_id: "",
    name:""
  }) 

  console.log("form.category_id", form.category_id)

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  form.category_id = product.category_id

  console.log("xxx", product.category_id)
  onMounted(() => {
    form.category_id = product.category_id

    /*pending.value = true
    CategoryService.getCategoriesSelect()
      .then((response) => {
        category.value = response.data.map(function(c) {
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
        form.category_id = product.category_id
        console.log(form.category_id, product.category_id)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })*/
    
    /*pending.value = true
    MarkService.getMarksSelect()
      .then((response) => {         
         mark.value =   response.data
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })*/

    /*pending.value = true
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
      })*/
  })
  
  /*const getMeasureUnits = async (measureUnitTypeId) => {    
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
  }*/

  /*const insertProduct = async (product: Product) => {
    pending.value = true
    return ProductService.insertProduct(product)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: '/products' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateProduct = async (product: Product, productId: string) => {
    pending.value= true
    return ProductService.updateProduct(productId, product)
      .then((response) => {
        alert( response.data.message )
        router.push( { path: '/products' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }*/
  
  /*const submit = (product: Product) => {
    !productId ? insertProduct (product)  : updateProduct(product, productId)
  }*/

  /*const initMeasureUnits = () => {
    form.measure_unit_id = ""
    measureUnits.value = []
  }

  watch(
    () => form.measure_unit_type_id,
    (newMeasureUnitType, oldMeasureUnitType) => { //emit('getMeasureUnits', newMeasureUnitType)        
      newMeasureUnitType === ""
        ? initMeasureUnits()
          : getMeasureUnits(form.measure_unit_type_id)      
    },
    { immediate: false, deep: true },
  )*/



  return {
    //category,
    form,
    /*errors,
    pending,
    mark,
    measureUnitTypes,
    measureUnits,  */  

    //submit    
  }

}
