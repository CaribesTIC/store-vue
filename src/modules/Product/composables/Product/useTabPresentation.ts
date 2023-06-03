import { computed, onMounted, reactive, ref } from 'vue'
import useHttp from "@/composables/useHttp";
import PresentationService from "@/modules/Product/services/PresentationService";
import type { Ref } from "vue";
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
  
  const presentation: Presentation = reactive({
    sale_type: 0,
    int_cod: "",
    bar_cod: "",
    packing_deployed: "",
    packing_json: "",
    stock_min: 0,
    stock_max: 0,
    price: "0.0",
    status: 0
  })
  
  const presentations: Ref<Presentation[]>  = ref([])
  const panelOpened = ref(false)
  const closeButtonOpened = computed(()=> panelOpened.value ? "Cerrar" : "Abrir")
  const closeClassOpened = computed(()=> panelOpened.value ? "btn-default" : "btn-primary")

  const {  
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(() => getPresentations())
  
  const getPresentations = async () => {
    pending.value = true
    PresentationService.getPresentations(productId)
      .then(res => presentations.value = res.data)
      .catch(err => errors.value = getError(err))
      .finally(() => pending.value = false) 
  }

  const insertPresentation = async (presentation: Presentation) => {
    pending.value = true
    presentation.product_id = productId
    return PresentationService.insertPresentation(presentation)
      .then((response) => {
        panelOpened.value = false
        getPresentations()    
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
    !presentationId ? insertPresentation (presentation)  : updatePresentation(presentation)
  }

  const edit = (presentationEdit: Presentation) => {
    presentation.sale_type = presentationEdit.sale_type ? 1 : 0
    presentation.int_cod = presentationEdit.int_cod
    presentation.bar_cod = presentationEdit.bar_cod
    presentation.packing_deployed = presentationEdit.packing_deployed
    presentation.packing_json = presentationEdit.packing
    presentation.stock_min = presentationEdit.stock_min
    presentation.stock_max = presentationEdit.stock_max
    presentation.price = presentationEdit.price
    presentation.status = presentationEdit.status ? 1 : 0
    panelOpened.value = true    
  }

  return {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,
    presentations,
    presentation,
    saleTypeOptions,
    statusOptions,

    edit,
    submit
  }
}
