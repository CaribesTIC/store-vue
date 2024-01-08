import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import MovementService from "@/modules/Inventory/services/Movement";

import type { Movement } from "../../types/Movement";

export default (movementId?: string) => {
  const router = useRouter();    

  const movement: Movement = reactive({
    int_cod: "", 
    name: "", 
    price: "", 
    stock_min: "", 
    stock_max: "", 
    status: "", 
    photo: "", 
    id_user_insert: "", 
    id_user_update: "", 
  })

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(() => {
    if (movementId) {
      pending.value = true
      MovementService.getMovement(movementId)
        .then((response) => { 
          movement.int_cod = response.data.data.int_cod 
          movement.name = response.data.data.name 
          movement.price = response.data.data.price 
          movement.stock_min = response.data.data.stock_min 
          movement.stock_max = response.data.data.stock_max 
          movement.status = response.data.data.status 
          movement.photo = response.data.data.photo 
          movement.id_user_insert = response.data.data.id_user_insert 
          movement.id_user_update = response.data.data.id_user_update 
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }    
  })

  const insertMovement = async (movement: Movement) => {
    pending.value = true
    return MovementService.insertMovement(movement)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: `/movements/edit/${response.data.movement_id}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateMovement = async (movement: Movement, movementId: string) => {
    pending.value= true
    movement._method = 'PUT'
    return MovementService.updateMovement(movementId, movement)
      .then((response) => {
        alert( response.data.message )
        //router.push( { path: '/movements' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (movement: Movement) => {
    !movementId ? insertMovement(movement) : updateMovement(movement, movementId)
  }

  return {    
    movement,
    errors,
    pending,

    submit
  }
}
