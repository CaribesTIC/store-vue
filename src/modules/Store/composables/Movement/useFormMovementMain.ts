import { ref, computed } from 'vue' // reactive
import { useVuelidate } from "@vuelidate/core";
import useRoutePath from "./useRoutePath"
import { required, helpers } from "@vuelidate/validators";
import type { Main } from "../../types/Movement"

export default (main: Main) => {
  const { movementTypeId } = useRoutePath()
  const options = ref([]);

  if (movementTypeId.value === '1' ) {
    options.value.push(
      { id: '1', name: 'Orden de Compra' },
      { id: '2', name: 'Orden de Entrada' },
      { id: '3', name: 'Reposición' }
    )
  } else if (movementTypeId.value === '2' ) {
    options.value.push(
      { id: '4', name: 'Factura' },
      { id: '5', name: 'Orden de Salida' },
      { id: '6', name: 'Requisición' }
    )
  } else if (movementTypeId.value === '3' ) {
    options.value.push({ id: '7', name: 'Movimiento de Entrada' })
    main.support_type_id = "7"
  } else if (movementTypeId.value === '4' ) {
    options.value.push({ id: '8', name: 'Movimiento de Salida' })
    main.support_type_id = "8"
  }

  /*const form = reactive({
    type_id: main.type_id, 
    number: main.number, 
    date_time: main.date_time, 
    subject: main.subject, 
    description: main.description, 
    observation: main.observation,     
    support_type_id: main.support_type_id, 
    support_number: main.support_number, 
    support_date: main.support_date   
  });*/

  const rules = computed(() => {
    return {
      //type_id: {
      //  required: helpers.withMessage("Campo requerido", required),
      //},
      //number: {
      //  required: helpers.withMessage("Campo requerido", required),
      //},
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
      //support_date: {
      //  required: helpers.withMessage("Campo requerido", required),
      //}      
    }
  })

  const v$ = useVuelidate(rules, main);

  const search = ()=> new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(alert('Buscando informacion de soporte...'));
    }, 300);
  })

  return { options, v$, search }
}
