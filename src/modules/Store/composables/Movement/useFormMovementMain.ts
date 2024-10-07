import { reactive, computed } from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import type { Main } from "../../types/Movement"

export default (main: Main) => { 
  const form = reactive({
    type_id: main.type_id, 
    number: main.number, 
    date_time: main.date_time, 
    subject: main.subject, 
    description: main.description, 
    observation: main.observation,     
    support_type_id: main.support_type_id, 
    support_number: main.support_number, 
    support_date: main.support_date   
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
      support_type_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      support_number: {
        required: helpers.withMessage("Campo requerido", required),
      },
      support_date: {
        required: helpers.withMessage("Campo requerido", required),
      }      
    }
  })

  const v$ = useVuelidate(rules, form);

  return { form, v$ }
}
