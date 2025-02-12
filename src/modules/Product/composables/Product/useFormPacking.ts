import { ref, reactive, onMounted, computed } from "vue"
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric, minValue } from "@vuelidate/validators";
import CommonService from "../../services/CommonService"
import useHttp from "@/composables/useHttp"

export default () => {
  const { errors, pending, getError } = useHttp()
  const containers = ref([])
  const preForm = reactive({
    quantity: 0.1,
    packing: ""
  })  

  onMounted(async () => {
    CommonService.getContainers()
      .then((response) => {        
        containers.value=response.data.map(function(c) {
          return {
            id: c.description,
            name: c.description
          }
        }).sort(function (a, b) {
          if (a.name > b.name) { return  1; }
          if (a.name < b.name) { return -1; }
          // a must be equal to b
          return 0;
        })
      })
      .catch((err) => {        
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })
  })  

  const rules = computed(() => {
    return {
      quantity: {
        required: helpers.withMessage("Campo requerido", required),         
        minValue: helpers.withMessage("El valor mínimo permitido es 0.1", minValue(0.1)) 
      },
      packing: {
        required: helpers.withMessage("Campo requerido", required),
      }      
    };
  });  
  
  const v$ = useVuelidate(rules, preForm, { $scope: false });
  
  const cleanAfter  = ()=> {        
    preForm.quantity = 0
    preForm.packing = ""    
    v$.value.$reset()
  }
  
  return {
    containers,
    preForm,    
    
    v$,
    cleanAfter 
  }
}
