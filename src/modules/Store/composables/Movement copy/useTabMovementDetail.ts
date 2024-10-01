import { computed, onMounted, reactive, ref } from 'vue'
import useHttp from "@/composables/useHttp";
import MovementDetailService from "@/modules/Store/services/MovementDetail";
import type { Ref } from "vue";
import type { MovementDetail } from "../../types/Movement/MovementDetail";

export default (movementId: string) => {
  /*const saleTypeOptions = [
    { label: 'Mayor', value: 0 },
    { label: 'Detal', value: 1 }  
  ]
  const statusOptions = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 }  
  ]*/
  
  const movement_detail: MovementDetail = reactive({
    id: "", 
    movement_id: "", 
    article_id: "", 
    quantity: "", 
    close: "", 
    user_insert_id: "", 
    user_update_id: "", 
  })
  
  const movement_details: Ref<MovementDetail[]>  = ref([])
  const panelOpened = ref(false)
  const closeButtonOpened = computed(()=> panelOpened.value ? "Cancel" : "Add")
  const closeClassOpened = computed(()=> panelOpened.value ? "btn-default" : "btn-primary")

  const {  
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(    
    () => {
      movement_detail.movement_id = movementId
      getMovementDetails()
    }
  )

  const panelToogleMovementDetail = ()=> {
    if (!panelOpened.value) {
      createMovementDetail()
    }
    panelOpened.value =! panelOpened.value    
  }
  
  const getMovementDetails = async () => {
    if (!movementId)
      return null 
    pending.value = true
    MovementDetailService.getMovementDetails(movementId)
      .then(res => movement_details.value = res.data)
      .catch(err => errors.value = getError(err))
      .finally(() => pending.value = false) 
  }

  const insertMovementDetail = async (payload: MovementDetail) => {
    pending.value = true
    payload.movement_id = movementId
    return MovementDetailService.insertMovementDetail(payload)
      .then((response) => {
        panelOpened.value = false
        getMovementDetails()    
        alert( response.data.message )
              
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateMovementDetail = async (payload: MovementDetail, movement_detailId: string) => {
    pending.value = true
    payload.movement_id = movementId
    payload._method = 'PUT'        
    return MovementDetailService.updateMovementDetail(payload, movement_detailId)
      .then((response) => {        
        panelOpened.value = false
        getMovementDetails()    
        alert( response.data.message )     
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submitMovementDetail = (payload: MovementDetail[]) => {    
    movement_details.value = payload
  }

  const createMovementDetail = () => {
      movement_detail.movement_id = movementId
      movement_detail.id = ""
      movement_detail.article_id = ""
      movement_detail.quantity = ""
      movement_detail.close = ""
      movement_detail.user_insert_id = ""
      movement_detail.user_update_id = ""
  }

  const editMovementDetail = (movement_detailEdit: MovementDetail) => {
    // presentation.status = presentationEdit.sale_type ? 1 : 0
    movement_detail.movement_id = movementId
    movement_detail.id = movement_detailEdit.id
    movement_detail.article_id = movement_detailEdit.article_id
    movement_detail.quantity = movement_detailEdit.quantity
    movement_detail.close = movement_detailEdit.close
    movement_detail.user_insert_id = movement_detailEdit.user_insert_id
    movement_detail.user_update_id = movement_detailEdit.user_update_id
    panelOpened.value = true
  }
  
  const removeMovementDetail = async (movement_detailId: string) => {
    if (movement_detailId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${movement_detailId}?`)) {  
      pending.value = true    
      return MovementDetailService.deleteMovementDetail(movement_detailId)
        .then((response) => {        
          getMovementDetails()
        })
        .catch((err) => {                
          console.log( err.response.data )
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false
        })
    }
  }

  return {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,
    movement_details,
    movement_detail,
    /*saleTypeOptions,
    statusOptions,*/

    createMovementDetail,
    editMovementDetail,
    getMovementDetails,
    removeMovementDetail, 
    submitMovementDetail,
    panelToogleMovementDetail
  }
}
