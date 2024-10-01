import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp";
import MovementService from "@/modules/Store/services/Movement";
import MovementDetailService from "@/modules/Store/services/MovementDetail";
import type { Movement } from "../../types/Movement";
// import type { MovementDetail } from "../../types/Movement/MovementDetail";


export default (movementId?: string) => {
  const router = useRouter();    

  // type Movement+detail 
  const movement: any = reactive({
    master: {
      //int_cod: "", 
      type_id: "1",
      number: "",
      date_time: "",
      subject: "", 
      description: "", 
      observation: ""
    },
    details: [
      /*{
          article_id: number      
          close: date.toString
          id: number
          int_cod: string
          movement_id: number
          name: string
          photo: string
          price: string
          quantity: number
          status: number
          stock_max: number
          stock_min: number    
    }*/
    ]
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
        movement.master.id = response[0].data.data.id 
        movement.master.type_id = response[0].data.data.type_id 
        movement.master.number = response[0].data.data.number 
        movement.master.date_time = response[0].data.data.date_time 
        movement.master.subject = response[0].data.data.subject 
        movement.master.description = response[0].data.data.description 
        movement.master.observation = response[0].data.data.observation 
        movement.master.close = response[0].data.data.close 
        movement.master.support_type_id = response[0].data.data.support_type_id
        movement.master.support_number = response[0].data.data.support_number
        movement.master.support_date = response[0].data.data.support_date        
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
  
  const submit = (payload: Movement) => {
    console.log('movement123', payload)
    movement.number=payload.number

    //!movementId ? insertMovement(movement) : updateMovement(movement, movementId)
  }

  return {    
    movement,
    errors,
    pending,

    submit
  }
}
