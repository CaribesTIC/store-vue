import { ref } from 'vue'
import useHttp from "@/composables/useHttp";
import PresentationService from "@/modules/Product/services/PresentationService";
import type { Presentation } from "../../types/Presentation";

export default (productId: string, presentationId?: string) => {
  const saleTypeOptions = [
    { label: 'Mayor', value: 0 },
    { label: 'Detal', value: 1 }  
  ]
  const statusOptions = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 }  
  ]

  const {  
    errors,
    pending,

    getError
  } = useHttp()

  const insertPresentation = async (presentation: Presentation) => {
    pending.value = true
    presentation.product_id = productId
    return PresentationService.insertPresentation(presentation)
      .then((response) => {         
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

  const updatePresentation = async (presentation: Presentation) => {
    pending.value= true
    presentation.product_id = productId
    presentation._method = 'PUT'        
    return PresentationService.updatePresentation(presentationId, presentation)
      .then((response) => {
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
  
  const submit = (presentation: Presentation) => {    
    !presentationId ? insertPresentation (presentation)  : updatePresentation(presentation, presentationId)
  }

  return {
    saleTypeOptions,
    statusOptions,
    
    submit
  }
}
