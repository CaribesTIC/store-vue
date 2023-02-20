import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import * as CategoryService from "@/modules/Product/services/CategoryService";
import * as MarkService from "@/modules/Product/services/MarkService";
import * as CommonService from "@/modules/Product/services/CommonService";
import ProductService from "@/modules/Product/services/ProductService";
//import type User from "../types/User"

export default (productId?: string) => {
  const router = useRouter();
  
  //const category = ref<Role[]>([])
  const category = ref([])
  const mark = ref([])
  const measureUnitTypes = ref([])
  const measureUnits = ref([])
  const measureUnit = ref("")
  
  // const user: User = reactive({
  const form = reactive({
    category_id: "",
    mark_id: "",
    measure_unit_type_id: "",
    measure_unit_id: "",
    name:""
  }) 

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(async () => {
    if (productId) {
      pending.value = true
      ProductService.getProduct(productId)
        .then((response) => {
          form.category_id = response.data.category_id;
          form.mark_id = response.data.mark_id;
          form.measure_unit_type_id = response.data.measure_unit_type_id;
          form.measure_unit_id = response.data.measure_unit_id;
          form.name = response.data.name
          if (form.measure_unit_type_id)
              getMeasureUnits(form.measure_unit_type_id)
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }

    pending.value = true
    CategoryService.getCategoriesSelect()
      .then((response) => {
        category.value =   response.data.map(function(c) {
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
         mark.value =   response.data
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
          measureUnit.value = measureUnits.value.find((item)=> item.id === form.measure_unit_id).name
      })
      .catch((err) => {        
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })
  }

  /*const insertUser = async (user: User) => {
    sending.value = true
    return UserService.insertUser(user)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: '/users' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        sending.value = false
      })
  }*/

  /*const updateUser = async (user: User, userId: string) => {
    sending.value= true
    return UserService.updateUser(userId, user)
      .then((response) => {
        alert( response.data.message )
        router.push( { path: '/users' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        sending.value = false
      })
  }*/
  
  //const submit = (user: User, userId?: string) => {
  //  !userId ? insertUser (user)  : updateUser(user, userId)
  const submit = (product, productId?) => {
    !productId ? insertProduct (product)  : updateProduct(product, userId)
  }

  const measureUnitUpdate = (event, selectedIndex) => {
    measureUnit.value = selectedIndex ? event.target[selectedIndex].text : ""
  }

  watch(
    () => form.measure_unit_type_id,
    (newMeasureUnitType, oldMeasureUnitType) => {
      //if (!measureUnit.value.includes(form.measure_unit_id)) form.measure_unit_id = ""
      if (newMeasureUnitType !== "") { //emit('getMeasureUnits', newMeasureUnitType)
        measureUnit.value = ""
        getMeasureUnits(form.measure_unit_type_id)
      }
    },
    { immediate: false, deep: true },
  )

  return {
    category,
    form,
    errors,
    pending,
    mark,
    measureUnitTypes,
    measureUnits,
    measureUnit,
    router,

    getMeasureUnits,
    measureUnitUpdate,
    submit    
  }

}
