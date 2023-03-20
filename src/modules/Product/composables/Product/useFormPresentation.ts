import { reactive, ref } from 'vue'
import type { Presentation } from "../../types/Presentation";
import type { Packing } from "../../types/Packing";

export default (presentation: Presentation) => {
  
  const form = reactive<Presentation>({
    sale_type: presentation.sale_type,
    int_cod: presentation.int_cod,
    bar_cod: presentation.bar_cod,
    packing_deployed: presentation.packing_deployed,
    packing_json: presentation.packing_json,
    stock_min: presentation.stock_min,
    stock_max: presentation.stock_max,
    price: presentation.price,
    status: presentation.status
  })

  const isOpenModal = ref(false)

  const acceptModal = (payload: Packing) => {
    form.packing_deployed = payload.packing_description
    form.packing_json = payload.packing_json
  }

  return {
    form,
    isOpenModal,

    acceptModal  
  }
}
