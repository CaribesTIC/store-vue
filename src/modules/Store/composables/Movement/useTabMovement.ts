import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import MovementService from "@/modules/Store/services/Movement";

import type { Movement } from "../../types/Movement";

export default (movementId?: string) => {
  const router = useRouter();    

  const movement: Movement = reactive({
    //int_cod: "", 
    type_id: "1",
    number: "",
    date_time: "",
    subject: "", 
    description: "", 
    observation: ""

  })




  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(() => {
    if (movementId) {
      pending.value = true
      MovementService.getMovement(movementId, 1)
        .then((response) => {
          movement.id = response.data.data.id 
          movement.type_id = response.data.data.type_id 
          movement.number = response.data.data.number 
          movement.date_time = response.data.data.date_time 
          movement.subject = response.data.data.subject 
          movement.description = response.data.data.description 
          movement.observation = response.data.data.observation 
          movement.close = response.data.data.close 
          movement.support_type_id = response.data.data.support_type_id
          movement.support_number = response.data.data.support_number
          movement.support_date = response.data.data.support_date
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
