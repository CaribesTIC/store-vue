//import { onMounted, reactive, ref, watch } from 'vue'
import type { Presentation } from "../../types/Presentation";

export default (presentation: Presentation) => {
  const saleTypeOptions = [
    { label: 'Mayor', value: 0 },
    { label: 'Detal', value: 1 }  
  ]
  const statusOptions = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 }  
  ]
  
  const submit = (presentation: Presentation) => {
    console.log(presentation)
    //alert("!presentationId ? insertPresentation (presentation)  : updatePresentation(presentation, presentationId)")
  }

  return {
    saleTypeOptions,
    statusOptions,
    
    submit
  }
}
