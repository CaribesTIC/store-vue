import { onMounted, computed, reactive, ref, watch } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minValue } from "@vuelidate/validators";
import useHttp from "@/composables/useHttp";

import type { MovementDetail } from "../../types/Movement/MovementDetail";

export default (movement_detail: MovementDetail) => {  
  const form = reactive<MovementDetail>({
    id: movement_detail.id, 
    movement_id: movement_detail.movement_id, 
    article_id: movement_detail.article_id, 
    quantity: movement_detail.quantity, 
    close: movement_detail.close, 
    user_insert_id: movement_detail.user_insert_id, 
    user_update_id: movement_detail.user_update_id, 
  })

  const {
    errors,
    pending,

    getError
  } = useHttp()

  const isOpenModal = ref(false)
  
  const rules = computed(() => {
    return {
      movement_id: { required: helpers.withMessage("Campo requerido", required) },
      article_id: { required: helpers.withMessage("Campo requerido", required) },
      quantity: { required: helpers.withMessage("Campo requerido", required) },
      close: { required: helpers.withMessage("Campo requerido", required) },
      user_insert_id: { required: helpers.withMessage("Campo requerido", required) },
      user_update_id: { required: helpers.withMessage("Campo requerido", required) },
    };
  });

  const v$ = useVuelidate(rules, form as any);
    
  watch(movement_detail, (newMovementDetail) => {
    form.movement_id = newMovementDetail.movement_id
    form.article_id = newMovementDetail.article_id
    form.quantity = newMovementDetail.quantity
    form.close = newMovementDetail.close
    form.user_insert_id = newMovementDetail.user_insert_id
    form.user_update_id = newMovementDetail.user_update_id
  })

  onMounted(() => {

    })

  return {

    
    v$ 
  }
}
