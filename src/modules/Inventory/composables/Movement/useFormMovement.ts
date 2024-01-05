import { onMounted, reactive, ref, computed } from 'vue'
import useHttp from "@/composables/useHttp";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import MovementService from "../../services/Movement"

import type { Movement } from "../../types/Movement"

// import { ascBubble } from "@/utils/helpers";

export default (movement: Movement) => {
  

  const form = reactive({
    type_id: movement.type_id, 
    number: movement.number, 
    date_time: movement.date_time, 
    subject: movement.subject, 
    description: movement.description, 
    observation: movement.observation, 
    close: movement.close, 
    support_type_id: movement.support_type_id, 
    support_number: movement.support_number, 
    support_date: movement.support_date, 
    user_insert_id: movement.user_insert_id, 
    user_update_id: movement.user_update_id, 
    user_edit_id: movement.user_edit_id, 
    editing: movement.editing, 
  })

  const {
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(() => {









    











    /*pending.value = true
    CategoryService.getCategoriesSelect()
      .then((response) => {
        categories.value = response.data.map(function (c) {
          return {
            id: c.id,
            name: c.family
          }
        }).sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    MarkService.getMarksSelect()
      .then((response) => {
        marks.value = response.data.sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    CommonService.getMeasureUnitTypes()
      .then((response) => {
        measureUnitTypes.value = response.data.map(function (mut) {
          return {
            id: mut.id,
            name: mut.description
          }
        }).sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })*/
  })

  const rules = computed(() => {
    return {
      type_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      number: {
        required: helpers.withMessage("Campo requerido", required),
      },
      date_time: {
        required: helpers.withMessage("Campo requerido", required),
      },
      subject: {
        required: helpers.withMessage("Campo requerido", required),
      },
      description: {
        required: helpers.withMessage("Campo requerido", required),
      },
      observation: {
        required: helpers.withMessage("Campo requerido", required),
      },
      close: {
        required: helpers.withMessage("Campo requerido", required),
      },
      support_type_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      support_number: {
        required: helpers.withMessage("Campo requerido", required),
      },
      support_date: {
        required: helpers.withMessage("Campo requerido", required),
      },
      user_insert_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      user_update_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      user_edit_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      editing: {
        required: helpers.withMessage("Campo requerido", required),
      },
    }
  })

  const v$ = useVuelidate(rules, form);

  return {
      form,
    errors,
    pending,

    v$      
  }
}
