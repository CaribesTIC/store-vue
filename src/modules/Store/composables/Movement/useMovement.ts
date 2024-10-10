import { onMounted, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import useRoutePath from "./useRoutePath"
import useHttp from "@/composables/useHttp";
import MovementService from "@/modules/Store/services/Movement";
import MovementDetailService from "@/modules/Store/services/MovementDetail";
import type { Movement } from "../../types/Movement";

export default (movementId?: string) => {
  const router = useRouter();
  const { routePath, movementTypeId } = useRoutePath()

  const movement = reactive<Movement>({
    main: {
      type_id: movementTypeId.value,
      number: "",
      date_time: "",
      subject: "", 
      description: "", 
      observation: "",
      support_type_id: "",
      support_number: "",
      support_date: ""
    },
    details: []
  })

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(() => {
    if (movementId) {
      pending.value = true
      Promise.all([
        MovementService.getMovement(movementId, 1),
        MovementDetailService.getMovementDetails(movementId)
      ]).then((response) => {
        movement.main.id = response[0].data.data.id 
        movement.main.type_id = response[0].data.data.type_id 
        movement.main.number = response[0].data.data.number 
        movement.main.date_time = response[0].data.data.date_time 
        movement.main.subject = response[0].data.data.subject 
        movement.main.description = response[0].data.data.description 
        movement.main.observation = response[0].data.data.observation 
        movement.main.close = response[0].data.data.close 
        movement.main.support_type_id = response[0].data.data.support_type_id
        movement.main.support_number = response[0].data.data.support_number
        movement.main.support_date = response[0].data.data.support_date        
        movement.details = response[1].data.map((r:any) => ({
          article_id: r.article_id,
          close: r.close,
          id: r.id,
          int_cod: r.int_cod,
          movement_id: r.movement_id,
          name: r.name,
          photo: r.photo,
          price: r.price,
          quantity: r.quantity,
          status: r.status,
          stock_max: r.stock_max,
          stock_min: r.stock_min
        }))
      })
      .catch((err) => {        
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      });      
    }    
  });  
    
  const submit = async () => {    
    pending.value = true
    return await MovementService.insertMovement(movementTypeId.value, toRaw(movement))
      .then((response) => {         
        //alert( response.data.message )
        //router.push( { path: `/${routePath.value}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  return {    
    movement,
    errors,
    pending,

    submit
  }
}
