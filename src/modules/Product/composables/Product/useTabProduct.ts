import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import * as CategoryService from "@/modules/Product/services/CategoryService";
import * as MarkService from "@/modules/Product/services/MarkService";
import ProductService from "@/modules/Product/services/ProductService";
//import type User from "../types/User"

export default (productId?: string) => {
  const router = useRouter();
  
  //const category = ref<Role[]>([])
  const category = ref([])
  const mark = ref([])
  
  // const user: User = reactive({
  const product = reactive({ 
    category_id: "",
    mark_id: "",
    id_measure_unit_type: "",
    id_measure_unit: "",
    name: ""
  })
  
  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(async () => {
    /*if (productId) {
      pending.value = true
      ProductService.getProduct(productId)
        .then((response) => {
          product.category_id: response.data.data.category_id,
          product.mark_id: response.data.data.mark_id,
          product.id_measure_unit_type: response.data.data.id_measure_unit_type,
          product.id_measure_unit: response.data.data.id_measure_unit,
          product.name: response.data.data.name
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }*/

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

    /*pending.value = true
    UserService.helperTablesGet()
      .then((response) => {
        roles.value = response.data.roles
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })*/
  })

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

  return {
    category,
    product,
    errors,
    pending,
    mark,
    router,

    submit    
  }

}
