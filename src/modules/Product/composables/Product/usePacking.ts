import { ref, reactive, onMounted, computed } from "vue"
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric, minValue } from "@vuelidate/validators";
import CommonService from "../../services/CommonService"
import useHttp from "@/composables/useHttp"

export default (measureUnit) => {
  const { errors, pending, getError } = useHttp()
  const containers = ref([])
  const preForm = reactive({
    quantity: 0,
    packing: ""
  })  
  const form = reactive({
    packing_description: "",
    packing_json: "",
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

  const rules1 = computed(() => {
    return {
      quantity: {
        required: helpers.withMessage("Campo requerido", required),         
        minValue: helpers.withMessage("El valor mínimo permitido es 1", minValue(1)) 
      },
      packing: {
        required: helpers.withMessage("Campo requerido", required),
      }      
    };
  });  
  
  const rules2 = computed(() => {
    return {      
      packing_description: {
        required: helpers.withMessage("Campo requerido", required),
      },
      packing_json: {
        required: helpers.withMessage("Campo requerido", required),
      }
    };
  });
  

  const v1$ = useVuelidate(rules1, preForm);
  const v2$ = useVuelidate(rules2, form);

  let n = 0, i = 0, packingJson = []
  const aConect = [ ' DE ', ' CON ' ] 

  const cleanAfter  = ()=> {        
    preForm.quantity = 0
    preForm.packing = ""    
    v1$.value.$reset()
  }

  const add = async ()=> {
    const result = await v1$.value.$validate();
    if (result) {
      let concatena1 = `${preForm.packing} ${aConect[n++]} ${preForm.quantity} `
      let concatena2 = ((form.packing_description.trim() === "")
        ? measureUnit
          : form.packing_description)
      form.packing_description = concatena1 + concatena2
      //form.packing_json[i++] = `{"packing":"${preForm.packing}","quantity":${preForm.quantity}}`
      packingJson[i++] = `{"packing":"${preForm.packing}","quantity":${preForm.quantity}}`
      form.packing_json = `[${packingJson}]`
      if (n == 2)
        n = 0;
      cleanAfter()
    }  
  }  

  const remove = ()=> {      
    cleanAfter()   
    form.packing_description = "";
    form.packing_json = "";
  }

  const lastPacking = computed(()=> form.packing_description.split(" ")[0])

  const labelOfquantity = computed(()=> "Cantidad de " + (form.packing_description=="" ? measureUnit : lastPacking.value))

  return {
    containers,
    preForm,
    form,
    labelOfquantity,

    add,
    remove,
    v1$,
    v2$
  }
}
